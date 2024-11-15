import { MenuItemModel } from './menu-item.model';

export class InternalMenuItemModel {
  active: boolean;
  semiActive: boolean;
  menuItemModel: MenuItemModel;

  constructor(mim: MenuItemModel) {
    this.menuItemModel = mim;
    this.active = false;
    this.semiActive = false;
  }
}
