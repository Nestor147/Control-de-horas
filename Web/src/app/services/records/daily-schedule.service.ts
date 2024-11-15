import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailySchedule } from 'src/app/models/records/daily-schedule';

@Injectable({
  providedIn: 'root',
})
export class DailyScheduleService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/DailySchedule/';
  }

  save(dailySchedule: DailySchedule): Observable<DailySchedule> {
    const objectToSend = JSON.stringify(dailySchedule);
    return this.http.post<DailySchedule>(this.apiUrl + 'Save/', objectToSend);
  }

  getAll(): Observable<Array<DailySchedule>> {
    return this.http.get<Array<DailySchedule>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<DailySchedule> {
    return this.http.get<DailySchedule>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<DailySchedule>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<DailySchedule>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
