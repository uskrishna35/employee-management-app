import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { SaveEmpService } from '../services/save-emp.service';
import { DeptService } from '../services/dept.service';

@Component({
  selector: 'app-add-employee',
  // standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    FormsModule, MatIconModule, MatSelectModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee: any = {};
  deptServices: any;
  department: any[] | undefined;
  selectedDepartment: any = " ";
  
  constructor(
    private http: HttpClient,
    private saveEmpService: SaveEmpService,
    private  deptService: DeptService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('HttpClient Injected:', !!this.http);
  }
  ngOnInit() {
    
     this.fetchDepatment();
    //  this.saveEmployee();
     
  }

  onDepartmentChange() {
    console.log('Selected Department:', this.selectedDepartment);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveEmployee(): void {
    console.log('Save button clicked');
  
    if (!this.employee) {
      console.error('Employee object is undefined');
      return;
    }
  
    const saveUrl = 'http://127.0.0.1:3000/api/employees';
    const updateUrl = 'http://127.0.0.1:3000/api/employees';

  
  
    const employeeData = { 
      ...this.employee, 
      department: this.selectedDepartment.toString()
    };
  
    console.log('Sending Data:', employeeData);
  
    this.http.post(saveUrl, employeeData).subscribe({
      next: (saveResponse: any) => {
        console.log('Employee Saved:', saveResponse);
        alert ('Employee Saved Successfully');
  
        this.http.get(updateUrl, employeeData).subscribe({
          next: (updateResponse: any) => {
            console.log('Employee List Updated:', updateResponse);
            this.dialogRef.close(saveResponse);
            console.log('Sent employee data:', JSON.stringify(employeeData));
          },
          error: (updateError: any) => {
            console.error('Error updating employee list:', updateError);
            alert('Error updating employee list.');
          }
        });
        
      },
      error: (saveError: any) => {
        console.error('Error saving employee:', saveError);
        alert('Error saving employee.');
      }
    });
  }

  fetchDepatment() {
    this.deptService.getDepartments().subscribe(
      (res: any) => {
        console.log('Departments API Response:', res);
        if (Array.isArray(res)) {
          this.department = res; 
        } else {
          this.department = [];
        }
      },
      (error: any) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  
}
