

import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { SquadGroup } from 'src/app/models/Squad/squad-group';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/Squad/';
  }

  getSquadsGrupsNamesByEmails(): Observable<Array<SquadGroup>> {
    return this.http.get<Array<SquadGroup>>(this.apiUrl + 'GetSquadNamesByEmails');
  }

}
