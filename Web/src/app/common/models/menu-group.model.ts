import { MenuItem } from './menu-item.model';

export class MenuGroup {
  Items: Array<MenuItem>;
  SubGroup: Array<MenuGroup>;
  IconClass: string;
  TranslationKey: string;

  get DisplayName(): string {

     return this._DisplayName;
  }

  set DisplayName(value: string) {
    this._DisplayName = value;
  }

  private _DisplayName: string;

  constructor(displayName: string, iconClass: string, translationKey: string) {
    this._DisplayName = displayName;
    this.Items = [];
    this.SubGroup = [];
    this.IconClass = iconClass;
    this.TranslationKey = translationKey;
  }
}
