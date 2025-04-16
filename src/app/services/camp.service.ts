import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  getDepartment() {
    throw new Error('Method not implemented.');
  }
  getDepartments() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:3000/api/healthcamps'; // API URL

  constructor(private http: HttpClient) {}

  getHealthCamps(): Observable<any[]> {
    const payload = {}; // Empty object if no filters are required

    return this.http.post<any[]>(this.apiUrl, payload) // Use POST request
      .pipe(
        map(response => {
          console.log('Service Response:', response);
          return response; // Return the response directly if it's an array
        }),
        catchError(error => {
          console.error('API Error:', error);
          return of([]); // Return an empty array in case of error
        })
      );
  }
}
