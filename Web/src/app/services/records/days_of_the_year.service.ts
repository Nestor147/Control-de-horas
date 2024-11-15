import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DaysOfTheYear } from 'src/app/models/records/days_of_the_year';


@Injectable({
  providedIn: 'root',
})
export class DaysOfTheYearService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/DaysOfTheYear/';
  }

  save(daysOfTheYear: DaysOfTheYear): Observable<DaysOfTheYear> {
    const objectToSend = JSON.stringify(daysOfTheYear);
    return this.http.post<DaysOfTheYear>(this.apiUrl + 'Save/', objectToSend);
  }

  getAll(): Observable<Array<DaysOfTheYear>> {
    return this.http.get<Array<DaysOfTheYear>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<DaysOfTheYear> {
    return this.http.get<DaysOfTheYear>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<DaysOfTheYear>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<DaysOfTheYear>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
