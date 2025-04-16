import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrganizationService } from '../services/organization.service';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { FacilitiesService } from '../services/facilities.service';
import { CampService } from '../services/camp.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DeptService } from '../services/dept.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-registration',
  imports: [MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule, MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule, CommonModule, FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  employee: any = {};
  employees: any[] = [];
  organizations: any[] = [];
  facilities: any[] = [];
  healthCamps: any[] = [];
  departments: any[] = [];

  selectedOrganization: any = null;
  selectedFacility: any = null;
  selectedCamp: any = null;
  selectedDepartment: string = '';

  isButtonVisible: boolean = false;
  isSidebarOpen = false;
  orgId = 47;
  deptServices: any;
  dataSource: any;

  newEmployee = {
    campName: '',
    employeeName: '',
    facility: '',
    organization: '',
    department: ''
  };
  selectedOrgId: any;
  selectedEmployee: any;
  // department: any;

  constructor(private organizationService: OrganizationService,
    private employeeService: EmployeeService,
    private http: HttpClient,
    private facilitiesService: FacilitiesService,
    private campService: CampService,
    private deptService: DeptService,
    private dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService
  ) { }


  saveData() {
    if (!this.newEmployee.employeeName) {
      alert("Please fill in employee details before saving.");
      return;
    }

    // ✅ Emit new employee data before navigating
    // this.sharedService.addRegistration(this.newEmployee);
    // this.router.navigate(['/add-new']);
  }


  ngOnInit() {
    this.fetchOrganizations();
    this.fetchFacilities();
    this.fetchHealthCamps();
    this.fetchEmployees();
    // this.saveEmployee();
    this.fetchDepartments();
    // this.fetchRegisteredEmployees();

  }

  naviagteToRes() {
    this.router.navigate(['/result']);
  }

  naviagteToNew() {
    this.router.navigate(['/addnew']);
  }

  checkAndFetchEmployees() {
    if (this.selectedOrganization && this.selectedFacility && this.selectedCamp) {
      this.fetchEmployees();
    } else {
      this.employees = [];
    }
  }

  onOrganizationChange(event: any) {
    this.selectedOrganization = event.value;
    this.resetEmployeeData();
    this.checkAndFetchEmployees();
  }

  onFacilityChange(event: any) {
    this.selectedFacility = event.value;
    this.resetEmployeeData();
    this.checkAndFetchEmployees();
    this.checkButtonVisibility();
  }

  onCampChange(event: any) {
    this.selectedCamp = event.value;
    this.resetEmployeeData();
    this.checkAndFetchEmployees();
    this.checkButtonVisibility();
  }

  resetEmployeeData() {
    this.employees = [];
    this.employee = {};
  }

  checkButtonVisibility() {
    this.isButtonVisible = !!this.selectedOrganization && !!this.selectedFacility && !!this.selectedCamp;
  }

  visitDate: Date = new Date();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }



  fetchOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      (res: any) => {
        console.log('Fetched organizations:', res); // Debugging
        this.organizations = res; // Directly assign since API returns an array
      },
      (error: any) => {
        console.error('Error fetching organizations:', error);
      }
    );
  }
  
  

  fetchFacilities() {
    this.facilitiesService.getFacilities().subscribe(
      (res: any) => {
        console.log('Fetched facilities:', res); // Debugging
        this.facilities = res; // Assign response directly
      },
      (error: any) => {
        console.error('Error fetching facilities:', error);
      }
    );
  }

  fetchHealthCamps(): void {
    this.campService.getHealthCamps().subscribe(
      (res:any) => {
        console.log('Fetched health camps:', res); // Debugging
        this.healthCamps = res; // Assign response directly
        },
      
    );
  }

  fetchEmployees(): void {
    if (!this.selectedOrganization || !this.selectedFacility || !this.selectedCamp) {
      this.employees = [];
      return;
    }
  
    this.employeeService.getEmployees(this.orgId).subscribe(
      (response: any) => {
        console.log('Employees API Response:', response);
  
        if (Array.isArray(response)) {
          // Filter only employees with a valid first name
          this.employees = response.filter((res: any) => res.first_name);
        } else {
          this.employees = [];
        }
  
        console.log('Updated Employees List:', this.employees);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  

  onEmployeeSelect(selectedEmp: any): void {
    console.log('Selected Employee:', selectedEmp);  // Debug log to check the selected employee data
    // console.log('Selected Employee:', this.employee);
    this.employee = { ...selectedEmp };
  }
  

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: { org_id: this.orgId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmployees();
      }
    });
  }

  // saveEmployee(): void {
  //   if (!this.employee || !this.orgId) {
  //     console.error('Employee data or Organization ID is missing.');
  //     return;
  //   }

  //   const employeeData = {
  //     ...this.employee,
  //     org_id: this.orgId
  //   };

  //   this.http.post('https://api.teknologiunggul.com/entities/employees', employeeData).subscribe({
  //     next: (response: any) => {
  //       alert('Employee saved successfully.');
  //     },
  //     error: (error: any) => {
  //       console.error('API Error:', error);
  //       alert('Error saving employee. Check console for details.');
  //     }
  //   });
  // }

  fetchDepartments() {
    this.deptService.getDepartments().subscribe(
      (res: any) => {
        console.log('Fetched departments:', res); // Debugging
        this.departments = res; // Directly assign since API returns an array
      },
      (error: any) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  


  saveHealthCheckRegistration(): void {
    const registrationData = {
      emp_id: this.employee.emp_id,
      first_name: this.employee.firstName,
      last_name: this.employee.lastName,
      age: this.employee.age,
      email: this.employee.email,
      gender: this.employee.gender,
      org_id: this.selectedOrganization, 
      facility_id: this.selectedFacility,
      camp_id: this.selectedCamp,
      department: this.selectedDepartment
    };
    console.log("Registration Data:", registrationData);


    this.http.post('http://127.0.0.1:3000/api/selection', registrationData)
      .subscribe({
        next: (response: any) => {
          console.log('Registration saved successfully:', response);
          alert('Registration saved successfully.');
          this.router.navigate(['/addnew']);

          // After saving, fetch updated registered employees list
          // fetchSavedRegistrations();         
        },
        error: (error: any) => {
          console.error('Error saving registration:', error);
          alert('Error saving registration. Check console for details.');
        }
      });
  }
  // fetchRegisteredEmployees() {
  //   throw new Error('Method not implemented.');
  // }



}


// function fetchSavedRegistrations() {
//   throw new Error('Function not implemented.');
// }

