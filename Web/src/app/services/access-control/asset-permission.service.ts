import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/access-control/role';
import { BasePager } from '@aasinet/ngx-controls/models/data-pager';
import { AssetPermissionLites } from 'src/app/models/access-control/asset-permission-lites';

@Injectable()
export class AssetPermissionService {
  private apiUrl: string = '/api/AssetPermission';

  constructor(private http: HttpClient) { }

  searchByFilter(
    filter: string
  ): Observable<BasePager<AssetPermissionLites>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter);
    return this.http.get<BasePager<AssetPermissionLites>>(this.apiUrl + '/SearchByFilter', { params });
  }
  getAllByTypeIdAndFilter(roleId: number, filter: string, typeId: number): Observable<AssetPermissionLites[]> {
    const params: HttpParams = new HttpParams()
      .append('roleId', (roleId !== undefined ? roleId.toString() : ''))
      .append('filter', (filter !== undefined ? filter.toString() : ''))
      .append('typeId', (typeId !== undefined ? typeId.toString() : ''));
    return this.http.get<AssetPermissionLites[]>(this.apiUrl + '/GetAllByTypeIdAndFilter', { params });
  }
  save(assetPermissionLite: AssetPermissionLites[]): Observable<AssetPermissionLites[]> {
    const objectsToSend = JSON.stringify(assetPermissionLite);
    return this.http.post<AssetPermissionLites[]>(this.apiUrl + '/SaveListAssetPermission', objectsToSend);
  }

  getAllRolesWithoutEntityRestriction(entities: Array<number>): Observable<Array<Role>> {
    const params: HttpParams = new HttpParams()
      .append('entities', entities.toString());
    return this.http.get<Array<Role>>(this.apiUrl + '/GetAllRolesWithoutEntityRestriction', { params });
  }

  printControlAccessMenuReport(assetTypeId: number): Observable<any>{
    const params: HttpParams = new HttpParams()
    .append('assetTypeId', assetTypeId.toString());
    return this.http.get('/api/ReportAccessControlRole/PrintControlAccessMenuReport/', {
      params,
      responseType: 'arraybuffer' as 'json'
    });
  }
}
