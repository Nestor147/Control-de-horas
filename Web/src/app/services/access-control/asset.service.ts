import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagedCustomSelectionService } from '@aasinet/ngx-controls/interfaces/search-components';
import { Asset } from '../../models/access-control/asset';
import { AssetCustomSelectionParameters } from '../../parameters/access-control/asset-custom-selection-parameters';
import { BasePager } from '@aasinet/ngx-controls/models/data-pager';
import { List } from '@aasinet/ngx-controls/utils/array';
import { Observable } from 'rxjs';
import { AssetType } from '../../models/access-control/asset-type';
import { MenuItemModels } from '../../models/menu-item-models';
import { AssetLite } from 'src/app/models/access-control/asset-lite';

@Injectable({ providedIn: 'root' })
export class AssetService implements IPagedCustomSelectionService<Asset, AssetCustomSelectionParameters> {
  private apiUrl: string = '/api/asset/';

  constructor(private http: HttpClient) { }

  customSelectionSearch(
    filter: string,
    param: AssetCustomSelectionParameters,
    selectedItems: Asset[],
    pageIndex: number,
    pageSize: number
  ): Observable<BasePager<Asset>> {
    param.ExceptIds = new List<Asset>(selectedItems).Select(i => i.Id).ToArray();
    param.Filter = filter;
    param.PageIndex = pageIndex;
    param.RowsByPage = pageSize;
    const objectToSend = JSON.stringify(param);
    return this.http.post<BasePager<Asset>>(this.apiUrl + 'GetAllAssetExceptIds', objectToSend);
  }

  get(id: number): Observable<Asset> {
    return this.http.get<Asset>(this.apiUrl + 'GetById/' + id);
  }
  getAll(filter: string): Observable<Array<Asset>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter);

    return this.http.get<Array<Asset>>(this.apiUrl + 'GetAll');
  }
  getByFilter(filter: string): Observable<Array<Asset>> {
    const params: HttpParams = new HttpParams()
      .append('filter', (filter !== undefined ? filter.toString() : ''));

    return this.http.get<Array<Asset>>(this.apiUrl + 'GetAll', { params });
  }
  getMenuByUserEmail(languageCode: string): Observable<Array<MenuItemModels>> {
    const params: HttpParams = new HttpParams()
    .append('languageCode', languageCode);
    return this.http.get<Array<MenuItemModels>>(this.apiUrl + 'GetOptMenuByEmployeeEmail', { params });
  }
  searchByFilter(filter: string, assetType: AssetType): Observable<BasePager<Asset>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('assetTypeId', (assetType.Id !== undefined ? assetType.Id.toString() : ''));
    return this.http.get<BasePager<Asset>>(this.apiUrl + 'SearchByFilter', { params });

  }
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }

  save(entity: Asset): Observable<Asset> {
    const objectToSend = JSON.stringify(entity);
    return this.http.post<Asset>(this.apiUrl + 'save', objectToSend);
  }

  getGroupByFilter(filter: string, assetTypeId: number): Observable<Array<string>> {
    const params: HttpParams = new HttpParams()
      .append('filter', (filter !== undefined ? filter.toString() : ''))
      .append('assetTypeId', assetTypeId.toString());
    return this.http.get<Array<string>>(this.apiUrl + 'GetGroupByFilter', { params });
  }
  getGroupNameFilter(filter: string): Observable<Array<AssetLite>> {
    const params: HttpParams = new HttpParams()
      .append('filter', (filter !== undefined ? filter.toString() : ''));
    return this.http.get<Array<AssetLite>>(this.apiUrl + 'GetGroupNameFilter', { params });
  }
}

