import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

interface ApiResponse {
  status: number;
  data: { pagination: any; response: {
    test_name: any; id: number; name: string 
}[] }[];
  error_msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://api.teknologiunggul.com/entities/filter/lab_test'; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {}

  getDropdownOptions(): Observable<ApiResponse> {
    let token = ''; 

    // ✅ Ensure `localStorage` is only accessed in the browser
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      OrgId: 'intern_test'
    });

    return this.http.post<ApiResponse>(this.apiUrl, {}, { headers });
  }
}
