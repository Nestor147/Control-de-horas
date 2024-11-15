import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AssetType } from '../../models/access-control/asset-type';
import { BasePager } from '@aasinet/ngx-controls/models/data-pager';

@Injectable({ providedIn: 'root'})
export class AssetTypeService {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = '/api/AssetType/';
  }
  searchByFilter(filter: string): Observable<BasePager<AssetType>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter);
    return this.http.get<BasePager<AssetType>>(this.apiUrl + 'SearchByFilter', { params });
  }

  save(account: AssetType): Observable<AssetType> {
    const objectToSend = JSON.stringify(account);
    return this.http.post<AssetType>(this.apiUrl + 'save/', objectToSend);
  }

  getAll(): Observable<Array<AssetType>> {
    return this.http.get<Array<AssetType>>(this.apiUrl + 'GetAll');
    }

  get(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(this.apiUrl + 'GetById/' + id);
  }

  getById(id: number): Observable<AssetType>{
    const params: HttpParams = new HttpParams().append('id', id ? id.toString(): '');
    return this.http.get<AssetType>(this.apiUrl+ '/GetById', {params});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }
}
