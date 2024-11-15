import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeOff } from 'src/app/models/records/time-off';

@Injectable({
  providedIn: 'root'
})
export class TimeOffService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {TimeOff
    this.apiUrl = '/api/TimeOff/';
  }

  save(TimeOff: TimeOff): Observable<TimeOff> {
    const objectToSend = JSON.stringify(TimeOff);
    return this.http.post<TimeOff>(this.apiUrl + 'Save/', objectToSend);
  }

  get(id: number): Observable<TimeOff> {
    return this.http.get<TimeOff>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<TimeOff>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<TimeOff>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
