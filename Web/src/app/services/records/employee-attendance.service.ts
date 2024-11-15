import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAttendance } from 'src/app/models/records/employee-attendance';


@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {
  private readonly apiUrl: string;
  private http=inject(HttpClient)
  constructor() {
    this.apiUrl = '/api/EmployeeAttendance/';
  }
  save(process: EmployeeAttendance): Observable<EmployeeAttendance> {
    const objectToSend = JSON.stringify(process);
    return this.http.post<EmployeeAttendance>(this.apiUrl + 'Save/', objectToSend);
  }
  getAll(): Observable<Array<EmployeeAttendance>> {
    return this.http.get<Array<EmployeeAttendance>>(this.apiUrl + 'GetAll');
  }
  get(id: number): Observable<EmployeeAttendance> {
    return this.http.get<EmployeeAttendance>(this.apiUrl + 'GetById/' + id);
  }
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  RetrieveAndSaveAllData() {
 
    return this.http.post(this.apiUrl + 'RetrieveAndSaveAllData/', {});
  }



  
  GetDataByDateRange(startDate: Date, endDate: Date, name?: string): Observable<EmployeeAttendance[]> {
    const isoInitialDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();
  
    // Construir los parámetros de la URL dependiendo si se proporciona un nombre o no
    let queryParams = `startDate=${isoInitialDate}&endDate=${isoEndDate}`;
   
    // Solo agregar el nombre si no está vacío
    if (name && name.trim().length > 0) {
      queryParams += `&employeeName=${encodeURIComponent(name)}`;
    }
  
    return this.http.get<EmployeeAttendance[]>(`${this.apiUrl}GetDataByDateRange?${queryParams}`);
  }
  
  


searchByFilter(filter: string, pager: Pager): Observable<BasePager<EmployeeAttendance>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<EmployeeAttendance>>(this.apiUrl + 'SearchByFilter', { params });
  }



}
