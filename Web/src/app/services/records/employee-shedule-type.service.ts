import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeScheduleType } from 'src/app/models/records/employee-schedule-type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeScheduleTypeService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/EmployeeScheduleType/';
  }

  save(employeeScheduleType: EmployeeScheduleType): Observable<EmployeeScheduleType> {
    const objectToSend = JSON.stringify(employeeScheduleType);
    return this.http.post<EmployeeScheduleType>(this.apiUrl + 'Save/', objectToSend);
  }

  getAll(): Observable<Array<EmployeeScheduleType>> {
    return this.http.get<Array<EmployeeScheduleType>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<EmployeeScheduleType> {
    return this.http.get<EmployeeScheduleType>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<EmployeeScheduleType>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<EmployeeScheduleType>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
