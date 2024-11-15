import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasePager } from '@aasinet/ngx-controls/models/data-pager';
import { Role } from '../../models/access-control/role';
import { RoleCustomSelectionParameters } from '../../parameters/access-control/role-custom-selection-parameters';
import { IPagedCustomSelectionService } from '@aasinet/ngx-controls/interfaces/search-components';
import { List } from '@aasinet/ngx-controls/utils/array';

@Injectable({ providedIn: 'root' })
export class RoleService implements IPagedCustomSelectionService<Role, RoleCustomSelectionParameters> {
  apiUrl: string = '/api/Role/';

  constructor(private http: HttpClient) { }

  customSelectionSearch(
    filter: string,
    param: RoleCustomSelectionParameters,
    selectedItems: Role[],
    pageIndex: number,
    pageSize: number
  ): Observable<BasePager<Role>> {
    param.ExceptIds = new List<Role>(selectedItems).Select(i => i.Id).ToArray();
    param.Filter = filter;
    param.PageIndex = pageIndex;
    param.RowsByPage = pageSize;
    const objectToSend = JSON.stringify(param);
    return this.http.post<BasePager<Role>>(this.apiUrl + '/GetAllRolesExceptIds', objectToSend);
  }

  searchByFilter(
    filter: string
    ): Observable<BasePager<Role>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter);
    return this.http.get<BasePager<Role>>(this.apiUrl + 'SearchByFilter', { params });
  }
  getAllRole(id: number): Observable<BasePager<Role>> {
    const params: HttpParams = new HttpParams()
      .append('id', id.toString());
    return this.http.get<BasePager<Role>>(this.apiUrl + 'getAllRole', { params });
  }
  getAll(): Observable<Array<Role>> {
  return this.http.get<Array<Role>>(this.apiUrl + 'GetAll');
  }
  save(role: Role): Observable<Role> {
    const objectToSend = JSON.stringify(role);
    return this.http.post<Role>(this.apiUrl + 'save/', objectToSend);
  }

  get(id: number): Observable<Role> {
    return this.http.get<Role>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  getAllRolesWithoutEntityRestriction(entities: Array<number>): Observable<Array<Role>> {
    const params: HttpParams = new HttpParams()
      .append('entities', entities.toString());
    return this.http.get<Array<Role>>(this.apiUrl + '/GetAllRolesWithoutEntityRestriction', { params });
  }

  getAllByRole(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(this.apiUrl + 'GetAllByRole');
    }

}
