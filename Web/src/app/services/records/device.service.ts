import { HttpClient,  } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAttendance } from 'src/app/models/records/employee-attendance';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly apiUrl: string;
  private http=inject(HttpClient)
  constructor() {
    this.apiUrl = '/api/Device/';
  }
  connect(): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'Connect', {});
  }
  

  disconnect() {

    return this.http.post(this.apiUrl + 'Disconnect', {});
  }
  



}
