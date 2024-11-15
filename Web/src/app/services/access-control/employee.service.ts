import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { RoleCustomSelectionParameters } from '../../parameters/access-control/role-custom-selection-parameters';
import { List } from '@aasinet/ngx-controls/utils/array';
import { Employee } from 'src/app/models/access-control/employee';
import { EmployeeField } from 'src/app/models/access-control/employee-field';


@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = '/api/Employee/';
  }

  customSelectionSearch(
    filter: string,
    param: RoleCustomSelectionParameters,
    selectedItems: Employee[],
    pageIndex: number,
    pageSize: number
  ): Observable<BasePager<Employee>> {
    param.ExceptIds = new List<Employee>(selectedItems).Select(i => i.Id).ToArray();
    param.Filter = filter;
    param.PageIndex = pageIndex;
    param.RowsByPage = pageSize;
    const objectToSend = JSON.stringify(param);
    return this.http.post<BasePager<Employee>>(this.apiUrl + '/GetAllRolesExceptIds', objectToSend);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<Employee>> {
    const params: HttpParams = new HttpParams()
      .append('Filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());

    return this.http.get<BasePager<Employee>>(this.apiUrl + 'SearchByFilter', { params });
  }
  SearchByFilterUserSystemEntity(filter: string, pager: Pager): Observable<BasePager<Employee>> {
    const params: HttpParams = new HttpParams()
      .append('Filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());

    return this.http.get<BasePager<Employee>>(this.apiUrl + 'SearchByFilterEmployeeEntity', { params });
  }
  save(role: Employee): Observable<Employee> {
    const objectToSend = JSON.stringify(role);
    return this.http.post<Employee>(this.apiUrl + 'Save/', objectToSend);
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  getAllRolesWithoutEntityRestriction(entities: Array<number>): Observable<Array<Employee>> {
    const params: HttpParams = new HttpParams()
      .append('entities', entities.toString());
    return this.http.get<Array<Employee>>(this.apiUrl + '/GetAllRolesWithoutEntityRestriction', { params });
  }

  SearchByFilterUserField(filter: string, pager: Pager): Observable<BasePager<EmployeeField>> {
    const params: HttpParams = new HttpParams()
      .append('Filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());

    return this.http.get<BasePager<EmployeeField>>(this.apiUrl + 'SearchByFilterEmployeeField', { params });
  }
}
