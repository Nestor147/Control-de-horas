import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AasinetLayoutModule, MenuItemModel } from '@aasinet/ngx-layout';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { APP_CONSTANTS } from 'src/app/app.constants';
import { AssetService } from 'src/app/services/access-control/asset.service';
import { GlobalSessionService } from 'src/app/services/session/global-session.service';

@Component({
  selector: 'welcome',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CoreComponentsModule,
    AasinetLayoutModule
],
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent  {
  menusPrev: Array<MenuItemModel>;
  constructor(      private assetService$: AssetService, public globalSession$: GlobalSessionService,)
  {
    this.menusPrev = [];
    this.getMenu();
  }
  getMenu():void {
    this.assetService$.getMenuByUserEmail('es-ES').subscribe(r => {

      r.forEach((item) => {
        const mim = new MenuItemModel();
        mim.id = item.id;
        mim.iconClass = item.iconClass;
        mim.parentId = item.parentId;
        mim.title = item.title;
        if (!item.isGroup) {
          mim.permission = (item as MenuItemModel).permission;
          mim.target = (item as MenuItemModel).target;
          mim.isFavority = (item as MenuItemModel).isFavority;
          mim.idFav = (item as MenuItemModel).idFav;
        }
        this.menusPrev.push(mim);
      });
      this.globalSession$.currentMenu.next(this.menusPrev);
      sessionStorage.setItem(APP_CONSTANTS.USER_MENU, JSON.stringify(this.menusPrev));


    });



  }
}
