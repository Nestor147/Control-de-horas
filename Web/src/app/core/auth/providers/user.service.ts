import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeProfile } from '../models';


@Injectable()
export class UserService {
  private apiUrl: string = '/api/core/Employeeinfo';

  constructor(private http: HttpClient) {}

  getMe(): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(this.apiUrl + '/me');
  }
}
