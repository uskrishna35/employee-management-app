import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ' http://127.0.0.1:3000/api/login'; // Update with your API URL
  http = inject(HttpClient)

  constructor() {} 

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}
