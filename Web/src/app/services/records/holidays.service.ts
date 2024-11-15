import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Holidays } from 'src/app/models/records/holidays';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/Holidays/';
  }

  save(holidays: Holidays): Observable<Holidays> {
    const objectToSend = JSON.stringify(holidays);
    return this.http.post<Holidays>(this.apiUrl + 'Save/', objectToSend).pipe(
      catchError(error => {
        return throwError(() => {
          error
        }); 
      })
    );
  }

  getAll(): Observable<Array<Holidays>> {
    return this.http.get<Array<Holidays>>(this.apiUrl + 'GetAll');
  }

  get(id: number): Observable<Holidays> {
    return this.http.get<Holidays>(this.apiUrl + 'GetById/' + id);
  }
  getUniqueYeards(): Observable<Holidays> {
    return this.http.get<Holidays>(this.apiUrl + 'GetUniqueYears');
  }


  getFilterByYearAndDescription(year:number, description:string): Observable<Holidays[]> {
    return this.http.get<Holidays[]>(`${this.apiUrl}FilterByYearAndDescription?year=${year}&description=${description}`);
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  searchByFilter(filter: string, pager: Pager): Observable<BasePager<Holidays>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('PageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<Holidays>>(this.apiUrl + 'SearchByFilter', { params });
  }
}
