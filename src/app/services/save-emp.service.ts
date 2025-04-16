import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveEmpService {

  private apiUrl = 'http://127.0.0.1:3000/api/employees';

  constructor(private http: HttpClient) {}

  // ✅ Save new employee
  saveEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.apiUrl, employeeData);
  }

  // ✅ Fetch employees based on organization ID
  getEmployees(orgId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?org_id=${orgId}`);
  }
}
