import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployeesByCampId(campId: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:3000/api/employees';
  http = inject(HttpClient);

  getEmployees(orgId: number) {
    const params = new HttpParams().set('org_id', orgId.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response: { data: any[] }) => {
        if (response?.data) {
          return response.data;
        }
        return [];
      })
    );
  }
}
