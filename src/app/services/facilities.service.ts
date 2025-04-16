import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  private apiUrl = 'http://127.0.0.1:3000/api/facilities'; // API URL for fetching facilities

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<any[]> {
    const payload = {}; // Empty payload if no filters are required

    return this.http.post<any[]>(this.apiUrl, payload) // Use POST request
      .pipe(
        map(response => {
          console.log('Service Response:', response);
          return response; // Return the response directly
        }),
        catchError(error => {
          console.error('API Error:', error);
          return of([]); // Return an empty array in case of error
        })
      );
  }
}
