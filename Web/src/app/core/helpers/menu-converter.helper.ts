import { APP_MENU } from '../../app.menu';
import { MenuItem } from '../../common/models/menu-item.model';
import { MenuGroup } from '../../common/models/menu-group.model';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { StaticInjector } from '@aasinet/ngx-controls/utils/app';

export class MenuConverterHelper {
  static getPlainMenuSchema(asString: boolean = true): string | Array<PlainMenuItemSchema> {
    if (asString) {
      return btoa(JSON.stringify(MenuConverterHelper.internalMenuConverter(false)));
    } else {
      return MenuConverterHelper.internalMenuConverter(true) as Array<PlainMenuItemSchema>;
    }
  }

  private static internalMenuConverter(withUrl?: boolean): Array<MenuItemToExport | PlainMenuItemSchema> {
    const menuParsed = new Array<MenuItemToExport>();
    const translator$ = StaticInjector.instance.get(TranslateService);
    const mainSystemGroup = translator$.getDirectTranslation('MAIN_MENU.SYSTEM.MAIN', 'System');
    APP_MENU.map(mi => {
      MenuConverterHelper.buildNewMenu(mi, menuParsed, (mi instanceof MenuGroup ? mi.DisplayName : mainSystemGroup), withUrl);
    });
    return menuParsed;
  }

  private static buildNewMenu(
    menuItem: MenuItem | MenuGroup,
    menuParsed: Array<MenuItemToExport | PlainMenuItemSchema>,
    groupTo: string,
    withUrl?: boolean
  ): void {
    if (menuItem instanceof MenuItem) {
      menuParsed.push(MenuConverterHelper.createMenuItem(menuItem, groupTo, withUrl));
    } else if (menuItem instanceof MenuGroup) {
      if (menuItem.Items && menuItem.Items.length > 0) {
        menuItem.Items.forEach(mii => {
          MenuConverterHelper.buildNewMenu(mii, menuParsed, groupTo, withUrl);
        });
      }
      if (menuItem.SubGroup && menuItem.SubGroup.length > 0) {
        menuItem.SubGroup.forEach(gi => {
          MenuConverterHelper.buildNewMenu(gi, menuParsed, groupTo, withUrl);
        });
      }
    }
  }

  private static createMenuItem(menuItem: MenuItem, groupTo: string, withUrl?: boolean): MenuItemToExport | PlainMenuItemSchema {
    if (withUrl) {
      const newMenu = new PlainMenuItemSchema();
      newMenu.DisplayName = menuItem.DisplayName;
      newMenu.Permission = menuItem.Name;
      newMenu.RouterLink = menuItem.RouterLink;
      return newMenu;
    } else {
      const newMenu = new MenuItemToExport();
      newMenu.DisplayName = menuItem.DisplayName;
      newMenu.Name = menuItem.Name;
      newMenu.Group = groupTo;
      newMenu.TranslationKey = menuItem.TranslationKey;
      return newMenu;
    }
  }
}

export class MenuItemToExport {
  DisplayName: string;
  Name: string;
  Group: string;
  TranslationKey: string;
}

export class PlainMenuItemSchema {
  DisplayName: string;
  RouterLink: string;
  Permission: string;
}
