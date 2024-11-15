import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { GlobalSessionService } from './session/global-session.service';
import { DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { LayoutService } from './core/layout.service';
import { APP_CONSTANTS } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard  {
  constructor(
    public globalSession$: GlobalSessionService,
    public router: Router,
    public dialogService: DialogService,
    public layoutService: LayoutService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const listMenu = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.USER_MENU));
    if (listMenu.filter(p => p.permission === route.data.permission).length > 0) {
      return true;
    } else {
        this.router.navigate(['welcome']).then();
        this.dialogService.singleOptionDialog(
          'Acceso denegado',
          'No tienes acceso a la página. Contacta con tu administrador.',
          DialogType.danger
        );
        return false;
      }
  }
}
