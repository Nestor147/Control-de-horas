import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MainApplicationService {

  loadingContent: BehaviorSubject<boolean>;
  internalViewNameSelected: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {

    this.loadingContent = new BehaviorSubject<boolean>(null);
    this.internalViewNameSelected = new BehaviorSubject<string>(null);
  }

  loadApplicationCache(
  ): void {
  }
}
