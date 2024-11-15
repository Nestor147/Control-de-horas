export class MenuItemModel {
  id: string | number;
  idFav: string | number;
  title: string;
  target: string;
  iconClass: string;
  parentId: string | number;
  isFavority: boolean;
  permission: string;

  constructor(obj?: MenuItemModel) {
    Object.assign(this, obj);
  }
}
