import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacation } from 'src/app/models/records/vacation';

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/Vacation/';
  }

  save(vacation: Vacation): Observable<Vacation> {
    const objectToSend = JSON.stringify(vacation);
    return this.http.post<Vacation>(this.apiUrl + 'Save/', objectToSend);
  }

  getAll(): Observable<Array<Vacation>> {
    return this.http.get<Array<Vacation>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<Vacation> {
    return this.http.get<Vacation>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<Vacation>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<Vacation>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
