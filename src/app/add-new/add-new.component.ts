import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { ListService } from '../services/list.service';

interface EmployeeRegistration {
  emp_id: any;
  camp_id: string;
  first_name: string;
  last_name: string;
  facility_id: string;
  org_id: string;
  department_id: string;
}

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Added for FormControl
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule
  ],
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'] 
})



export class AddNewComponent implements OnInit {
  filterForm = new FormGroup({
    organization: new FormControl(''),
    searchType: new FormControl(''),
    searchQuery: new FormControl('')
  });

  selectionForm = new FormGroup({
    organization: new FormControl(null), // full object
    facility: new FormControl(null),
    camp: new FormControl(null),
    employee: new FormControl(null),
    department: new FormControl(null)
  });
  
  

  organizations: any[] = [];
  displayedColumns: string[] = ['campName', 'employeeName', 'facility', 'organization', 'department', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listServices: any;

  constructor(
    private routes: Router,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private listService: ListService  ) {}

  ngOnInit() {
    this.fetchOrganizations();
    this.getSelections();
  

    
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator && this.sort) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log("Paginator & Sort initialized");
    }, 1000);
  }
  
  

  fetchOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      (res: any) => {
        this.organizations = res[0]?.response || [];
      },
      (error: any) => console.error('Error fetching organizations:', error)
    );
  }
  getSelections(): void {
    this.listService.getData().subscribe({
      next: (data) => {
        console.log("API Data:", data);
        this.mapData(data); // Call your own mapping function
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
  }
  
  
    
  
  mapData(apiData: any[]): void {
    this.dataSource = new MatTableDataSource(
      apiData.map((item: any) => ({
        emp_id: item?.employee_id ?? 'MISSING_ID',
        employeeName: item?.employeeName ?? 'Unknown',
        campName: item?.camp_name ?? 'Not Available',
        facility: item?.facility_name ?? 'Not Available',
        organization: item?.organization_name || 'N/A',
        department: item?.department_name ?? 'N/A'
      }))
    );
  
    console.log("Updated DataSource:", this.dataSource.data);
  
    setTimeout(() => {
      if (this.paginator && this.sort) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.cdr.detectChanges();
    });
  }
  
  
  

  onSubmit() {
    console.log("Filter Values:", this.filterForm.value);
  }

  navigateToRegistration() {
    this.routes.navigate(['/reg']);
  }


  filterValue = ''; 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  

  deleteRecord(emp_id: any): void {
    if (!emp_id) {
      console.error('Error: emp_id is undefined in deleteRecord() function');
      return;
    }
  
    if (confirm('Are you sure you want to delete this record?')) {
      this.listService.deleteData(emp_id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(item => item.emp_id !== emp_id);
          console.log(`Record with emp_id ${emp_id} deleted successfully`);
        },
        error: (err: any) => {
          console.error('Error deleting record:', err);
        }
      });
    }
  }
  
  submitSelection(): void{
  const payload = this.selectionForm.value;
  

  console.log("Payload to be submitted:", payload);

  this.listService.submitData(payload).subscribe({
    next: (res: any) => {
      console.log("Response from backend:", res);
      alert("Selection saved successfully");
      this.getSelections(); // Refresh table
      this.selectionForm.reset();
    },
    error: (err) => {
      console.error("Error submitting selection:", err);
      alert("Failed to save selection");
    }
  });
}

}
