import { MenuItemModel } from './menu-item.model';

export class FloatMenuItemModel extends MenuItemModel {
  childrens: Array<MenuItemModel> = [];

  constructor(item: MenuItemModel) {
    super(item);
    this.id = item.id;
    this.idFav = item.idFav;
    this.iconClass = item.iconClass;
    this.isFavority = item.isFavority;
    this.parentId = item.parentId;
    this.target = item.target;
    this.title = item.title;
  }
}
