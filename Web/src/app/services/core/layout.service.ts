import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuRootComponent } from '@aasinet/ngx-layout';
import { ResizeDataGridEnum } from '@aasinet/ngx-controls/enums/data-grid';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  externalResizeDataGrid: Subject<ResizeDataGridEnum>;
  mainMenu: BehaviorSubject<MenuRootComponent>;
  isRedirectByMenu: BehaviorSubject<boolean>;

  constructor() {
    this.externalResizeDataGrid = new Subject<ResizeDataGridEnum>();
    this.mainMenu = new BehaviorSubject<MenuRootComponent>(null);
    this.isRedirectByMenu = new BehaviorSubject<boolean>(null);
  }
}
