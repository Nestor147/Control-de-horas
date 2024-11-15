import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserSystemStoreItem } from 'src/app/models/core/user-system-store-item';
import { APP_CONSTANTS } from 'src/app/app.constants';
import { EmployeePreferences } from 'src/app/models/records/employee-preferences';
@Injectable({ providedIn: 'root' })
export class EmployeePreferencesService {

  paginator: UserSystemStoreItem;
  entity: EmployeePreferences;
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = '/api/EmployeePreferences/';
  }
  saveMenuFavorite(entity: EmployeePreferences): Observable<EmployeePreferences> {
    const objectToSend = JSON.stringify(entity);
    return this.http.post<EmployeePreferences>(this.apiUrl + 'SaveMenuFavorite/', objectToSend);
  }
}
