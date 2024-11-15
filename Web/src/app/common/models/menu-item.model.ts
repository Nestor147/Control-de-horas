import { StaticInjector } from '@aasinet/ngx-controls/utils/app';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { GlobalSettingService } from '../../services/core/global-settings.service';

export class MenuItem {
  IconClass: string;
  RouterLink: string;
  Name: string;
  TranslationKey: string;

  get DisplayName(): string {

     return this._DisplayName;
  }

  set DisplayName(value: string) {
    this._DisplayName = value;
  }

  private _DisplayName: string;

  constructor(displayName: string, iconClass: string, routerLink: string, name: string, translationKey: string) {
    this._DisplayName = displayName;
    this.IconClass = iconClass;
    this.RouterLink = routerLink;
    this.Name = name;
    this.TranslationKey = translationKey;
  }
}
