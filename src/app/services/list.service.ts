import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://127.0.0.1:3000/api/agg';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiUrl);
  }

  submitData(data: any): Observable<any> {
    console.log("Posting to API:", data);
    return this.http.post('http://127.0.0.1:3000/api/selection', data);
  }

  

  deleteData(employee_id: any): Observable<any> {
    if (!employee_id) {
      console.error('Error: empId is undefined in deleteData() function');
      return new Observable(); // Prevents API call with missing ID
    }
  
    const deleteUrl = `http://localhost:3000/api/selections_delete/${employee_id}`;
    console.log(`Sending DELETE request to: ${deleteUrl}`);
    
    return this.http.delete(deleteUrl);
  }
  
  
}
