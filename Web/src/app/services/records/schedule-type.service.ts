import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ScheduleType } from 'src/app/models/records/shedule-type';


@Injectable({
  providedIn: 'root',
})
export class ScheduleTypeService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/ScheduleType/';
  }

  save(scheduleType: ScheduleType): Observable<ScheduleType> {
    const objectToSend = JSON.stringify(scheduleType);
    return this.http.post<ScheduleType>(this.apiUrl + 'Save/', objectToSend).pipe(
      catchError(error => {
        return throwError(() => {
          error
        }); 
      })
    );
  }

  getAll(): Observable<Array<ScheduleType>> {
    return this.http.get<Array<ScheduleType>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<ScheduleType> {
    return this.http.get<ScheduleType>(this.apiUrl + 'GetById/' + id);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<ScheduleType>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<ScheduleType>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
