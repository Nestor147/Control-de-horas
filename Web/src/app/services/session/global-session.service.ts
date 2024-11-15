import { BehaviorSubject } from 'rxjs';
import { MenuItemModel, ProfileModel } from '@aasinet/ngx-layout';
import { LegalEntityLite } from '../../models/legal-entity-lite';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../app.constants';
import { EntityCultureCurrencyInfo } from '../../models/core/entity-culture-currency-info';
import { MenuItem } from '../../common/models/menu-item.model';
import { MenuGroup } from 'src/app/common/models/menu-group.model';
import { UserSystemStoreItem } from 'src/app/models/core/user-system-store-item';
import { EmployeeProfile } from 'src/app/core/auth';
@Injectable({ providedIn: 'root' })
export class GlobalSessionService {
  userStore: UserSystemStoreItem;
  currentCulture: BehaviorSubject<EntityCultureCurrencyInfo>;
  // currentLegalEntitySettings: BehaviorSubject<LegalEntitySettings>;
  currentMenu: BehaviorSubject<Array<MenuItemModel>>;
  darkModeEmitter: BehaviorSubject<boolean>;
  currentLegalEntity: BehaviorSubject<LegalEntityLite>;

  // load menu
  idCounter: number;
  menuPrev: Array<MenuItemModel>;
  // IsEnableMenu: BehaviorSubject<boolean>;
  appMenu: Array<MenuGroup | MenuItem>;
  // User accessors
  userProfile: BehaviorSubject<EmployeeProfile>;

  isDarkModeSubject: BehaviorSubject<boolean>;
  // isDarkMode$ = this.isDarkModeSubject.asObservable();

  get isUserSetup(): boolean {
    return !!this.userAsProfileModel;
  }

  get userAsProfileModel(): ProfileModel {
    if (!this.userProfile.getValue()) {
      return null;
    }
    return {
      ...new ProfileModel(),
      username: this.userProfile.getValue().Employeename,
      firstName: this.userProfile.getValue().FirstName,
      lastName: this.userProfile.getValue().LastName,
      email: this.userProfile.getValue().Email,
      imgURL: this.userProfile.getValue().PictureUrl
    } as ProfileModel;
  }

  get darkMode(): boolean {
    return (localStorage.getItem(APP_CONSTANTS.DARK_MODE_KEY)
      && localStorage.getItem(APP_CONSTANTS.DARK_MODE_KEY) === '1') as boolean;
  }

  set darkMode(value: boolean) {
    localStorage.setItem(APP_CONSTANTS.DARK_MODE_KEY, value ? '1' : '0');

    this.darkModeEmitter.next(value);
  }

  constructor() {
    this.currentMenu = new BehaviorSubject<Array<MenuItemModel>>(null);
    // this.currentLegalEntitySettings = new BehaviorSubject<LegalEntitySettings>(null);
    this.darkModeEmitter = new BehaviorSubject<boolean>(null);
    this.currentCulture = new BehaviorSubject<EntityCultureCurrencyInfo>(null);
    this.currentLegalEntity = new BehaviorSubject<LegalEntityLite>(null);
    this.userProfile = new BehaviorSubject<EmployeeProfile>(null);
    this.userStore = new UserSystemStoreItem({});
    this.isDarkModeSubject = new BehaviorSubject<boolean>(false);
  }

  setIsDarkMode(value: boolean): void {
    this.isDarkModeSubject.next(value);
  }

  getMainMenuItems(): void {
    this.idCounter = 100;
    this.menuPrev = [] as Array<MenuItemModel>;
    this.buildGroup(this.appMenu, 1);
    this.currentMenu.next(this.menuPrev);
  }

  buildGroup(
    list_group: Array<MenuGroup | MenuItem>,
    lastParentId: number
  ): void {
    const parentId = lastParentId;
    for (const gr of list_group) {
      // → If the element is a MenuItem
      if (gr instanceof MenuItem) {
        this.menuPrev.push(this.menuItemBuilder(gr, lastParentId));
        this.idCounter += 1;
      } else if (gr instanceof MenuGroup) {
        // → If the element is a MenuGroup
        // PARENT GROUP
        const mi = this.menuItemBuilder(gr, parentId, true);
        this.menuPrev.push(mi);
        lastParentId = mi.id as number;
        this.idCounter += 1;
        for (const gr_item of gr.Items) {
          // MENU ITEM
          const g_mi = this.menuItemBuilder(gr_item, mi.id as number);
          this.menuPrev.push(g_mi);
          this.idCounter += 1;
        }
        if (gr.SubGroup.length > 0) {
          this.buildGroup(gr.SubGroup, lastParentId);
        }
      }
    }
  }

  private menuItemBuilder(
    item: MenuItem | MenuGroup,
    parentId: number,
    isGroup?: boolean
  ): MenuItemModel {
    const mi = new MenuItemModel();
    mi.parentId = parentId;
    mi.id = this.idCounter;
    mi.title = item.DisplayName;
    mi.iconClass = item.IconClass;
    if (!isGroup) {
      mi.target = (item as MenuItem).RouterLink;
      mi.permission = (item as MenuItem).Name;
      mi.isFavority = false; // this.isFavoriteMenu((item as MenuItem)); // Orcarcop
    }
    return mi;
  }
}
