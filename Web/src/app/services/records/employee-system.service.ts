import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from 'src/app/models/records/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl: string;
  private http=inject(HttpClient)
  constructor() {
    this.apiUrl = '/api/Employee/';
  }
  save(process: Employee): Observable<Employee> {
    const objectToSend = JSON.stringify(process);
    return this.http.post<Employee>(this.apiUrl + 'Save/', objectToSend).pipe(
      catchError(error => {
        return throwError(() => {
          error
        }); 
      })
    );
  }
  getAll(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.apiUrl + 'GetAll');
  }
  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + 'GetById/' + id);
  }


  getIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'GetIdByEmployee?email=' + email);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  synchronizeUsers() {
   
    return this.http.post(this.apiUrl + 'synchronize/', {});
  }

  
  searchByFilter(filter: string, pager: Pager): Observable<BasePager<Employee>> {
    const params: HttpParams = new HttpParams()
    .append('filter', filter)
    .append('PageSize', pager.RowsByPage.toString())
    .append('pageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<Employee>>(this.apiUrl + 'SearchByFilter', { params });
  }

}
