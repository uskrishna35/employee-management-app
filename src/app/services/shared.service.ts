import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private registrationData = new BehaviorSubject<any[]>([]);
  registrationData$ = this.registrationData.asObservable();

  addRegistration(newData: any) {
    const currentData = this.registrationData.getValue();
    this.registrationData.next([...currentData, newData]);
  }
}
