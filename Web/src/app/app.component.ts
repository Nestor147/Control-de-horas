import { AfterViewInit, ApplicationRef, Component, OnInit, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { LayoutService } from './services/core/layout.service';
import { EntityModel, InternalMenuItemModel, ItemEventInterface, MenuItemModel, MenuRootComponent, ProfileModel, SystemInfo } from '@aasinet/ngx-layout';
import { Router } from '@angular/router';
import { AppBase } from '@aasinet/ngx-controls/models/global';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { MenuItem } from 'src/app/common/models/menu-item.model';
import { MenuGroup } from 'src/app/common/models/menu-group.model';
import { DataGridService } from '@aasinet/ngx-controls/services';
import { DataPagerService } from '@aasinet/ngx-controls/data-pager';
import { ConfigService } from './common/services/config.service';
import { TranslationPanelComponent } from './core/components/translation-panel/translation-panel.component';
import { Icons, Options } from 'angular2-notifications';
import { AModalService, AttachComponentToViewService, DialogService } from '@aasinet/ngx-controls/a-modal';
import { GlobalSessionService } from './services/session/global-session.service';
import { AuthService } from './core/auth';
import { LegalEntityLite } from './models/legal-entity-lite';
import { APP_CONSTANTS } from './app.constants';
import { TranslateLocalstorageLoader } from 'src/app/core/components/translator/translate-localstorage-loader';
import { SetMyPalette } from './core/helpers/set-my-palette';
import { TranslateExternalService } from './services/core/translate-external.service';
import { LowResolutionEnum, ScreenResolution, ScreenResolutionService } from './services/core/screen-resolution.service';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RegionCode } from './core/helpers/region-code';
import { DarkMode } from './core/helpers/dark-mode';
import { UserSystemStoreItem } from './models/core/user-system-store-item';
import { HeadDOMHandlingService } from './services/head-dom-handling.service';
import { MainApplicationService } from './services/core/main-application.service';
import { ColorsPalette } from '@aasinet/ngx-controls/utils/theme';
import { EmployeePreferences } from './models/records/employee-preferences';
import { EmployeePreferencesService } from './services/session/user-preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AppBase implements OnInit, AfterViewInit  {
  translationPanel: Type<TranslationPanelComponent> = TranslationPanelComponent;
  @ViewChild('mainMenu') mainMenu: MenuRootComponent;

  language: string;
  title: string;
  mydrop: boolean;
  modeDark: boolean;
  currentEntity: EntityModel;
  appMenu: Array<MenuGroup | MenuItem>;
  entity: LegalEntityLite;
  showModal: boolean;
  userObj: UserSystemStoreItem;
  profile: ProfileModel;
  systemInfoList: Array<SystemInfo>;
  employeePreferences: EmployeePreferences;

  options: Options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    lastOnBottom: true,
    icons: {
      info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-909.1 1405.5 24.1 24.1"><path d="M-898 1423.6h2c.1 0 .2-.1.2-.2v-6.9c0-.1-.1-.2-.2-.2h-2c-.1 0-.2.1-.2.2v6.9c0 .1.1.2.2.2zm1-18.1c-6.7 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 21.7c-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.6-9.6 9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm0-13.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2-1.2.5-1.2 1.2.5 1.2 1.2 1.2z" fill="#4EA0D5"/></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-909 0 24 24" width="24" height="24"><path d="M-897 0c-7 0-12 5.4-12 12s5 12 12 12 12-5.4 12-12-5-12-12-12zm0 2.5c5 0 10 4.3 10 9.6s-5 9.6-10 9.6-10-4.3-10-9.6 5-9.6 10-9.6zm4 5.03v.1l-6 5.47c0 .1 0 .1 0 0l-2-2.1c0-.1 0-.1 0 0l-2 1.5v.3l4 3.9c0 .1 0 .1 0 0l8-7.3v-.3l-2-1.5v-.1z" fill="#93C65A"/></svg>`,
      warn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24.2"><path d="M12.2.025c-.1 0-.2.025-.2.075l-1.7 3.4-8.6 17.3-1.501 3.1c-.1.1 0 .3.102.3H24c.1 0 .2-.1.1-.3l-1.5-3.1L14 3.5 12.3.1c0-.05-.1-.075-.1-.075zm0 4.795s.1 0 .1.1l8.4 16.68c.1.1 0 .3-.1.3H3.9c-.3 0-.4-.2-.3-.3L12 4.9c.1-.1.1-.1.2-.1zm-.8 4.58c-.1 0-.2.1-.2.2v6.1c0 .1.1.2.2.2h1.7c.1 0 .2-.1.2-.2V9.6c0-.1-.1-.2-.2-.2zm.8 8.6c-.6 0-1 .5-1 1.1 0 .6.4 1.1 1 1.1s1-.5 1-1.1c0-.6-.5-1.1-1-1.1z" fill="#E99027"/></svg>`
    } as Icons
  };

  constructor(
    private translate$: TranslateService,
    private router: Router,
    private layout$: LayoutService,
    private translateExternal$: TranslateExternalService,
    private attachComp$: AttachComponentToViewService,
    private dataGrid$: DataGridService,
    private dataPager$: DataPagerService,
    private auth$: AuthService,
    public globalSession$: GlobalSessionService,
    public dialogService: DialogService,
    public configService: ConfigService,
    public screen$: ScreenResolutionService,
    public notificationManager$: NotificationManagerService,
    private device$: DeviceDetectorService,
    private _appRef: ApplicationRef,
    public aasiModal: AModalService,
    private employeePreferences$: EmployeePreferencesService,
    private headDOMHandlingService$: HeadDOMHandlingService,
    public appService: MainApplicationService,
  ) {
    super();
    this.entity = new LegalEntityLite();

    this.dataPager$.storePagerKey = 'ROWS_BY_PAGE';
    this.dataPager$.rowsByPageSetting.next(null);
    let value = sessionStorage.getItem(APP_CONSTANTS.SESSION_ROWS_BY_PAGE);
    value = (value === undefined) ?  '10' : value;
    this.dataPager$.rowsByPageSetting.next(new UserSystemStoreItem({
      keyName : 'ROWS_BY_PAGE',
      keyValue: value
    }));
    this.getTranslateExternal();
    this.employeePreferences = new EmployeePreferences({});
  
    this.layout$.externalResizeDataGrid = this.dataGrid$.externalResizeDataGrid;
    this.currentEntity = new EntityModel();
    this.title = 'AANSNetWebApp';
    this.mydrop = false;
    this.modeDark = true;
    this.globalSession$.currentMenu.next(new Array<MenuItemModel>());
    this.setURLforSVGImages();

    if (this.globalSession$.currentLegalEntity.getValue() === null) {
        this.entity = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER));
        if (this.entity === null || this.entity === undefined) {
          this.router.navigate(['entity-selection']);
        } else {
          this.currentEntity.name = this.entity.Name;
          this.currentEntity.codeEntity = this.entity.Code;
          this.globalSession$.currentLegalEntity.next(this.entity);
          const menuUser = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.USER_MENU));
          if (menuUser != null) {
            this.globalSession$.currentMenu.next(menuUser);
            }
        }
      }

    this.globalSession$.darkModeEmitter.subscribe(i => {
        if (i == null) {
          return;
        }
        if (i) {
          this.setDarkMode();
        } else {
          this.removeDarkMode();
        }
    });
  }

  ngOnInit(): void {
    const entity = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER));
    if (entity !=  null) {
      this.translate$.use(entity.LanguageCode).subscribe(() => {
        RegionCode.setRegionAndCodes(entity.LanguageCode, entity.LanguageCode, this.translate$);
      });
    } 

    const eSettings = this.globalSession$.currentLegalEntity.getValue();
    if (eSettings == null) {
      this.headDOMHandlingService$.internalChangeHeadEntityIdentity('#ffd63843');
    } else {
      this.headDOMHandlingService$.internalChangeHeadEntityIdentity(eSettings.VisualIDentity);
    }
  }

  ngAfterViewInit(): void {
    this.attachComp$.iAppContainer = this.iAppContainer;
    this.globalSession$.currentLegalEntity.subscribe(le => {
       if (le) {
         this.currentEntity.name = le.Name;
         this.currentEntity.codeEntity = le.Code;

         SetMyPalette.setFullPaletteAndImages(le.VisualIDentity, this.configService, this.globalSession$.darkMode);
         let themeLabel = document.getElementById('theme-label');
         if ( themeLabel !== null ) {
            themeLabel.innerText = this.translate$.getDirectTranslation('COMMON_LAYOUT.THEME_LABEL', 'Themes');
            themeLabel = document.getElementById('light-mode-indicator');
            (themeLabel.firstElementChild as HTMLElement).innerText = this.translate$.getDirectTranslation('COMMON_LAYOUT.LIGHT_LABEL', 'Light');
            themeLabel = document.getElementById('dark-mode-indicator');
            (themeLabel.firstElementChild as HTMLElement).innerText = this.translate$.getDirectTranslation('COMMON_LAYOUT.DARK_LABEL', 'Dark');
          }

        // });

      } else {
        this.currentEntity = new EntityModel();
      }
    });
    // ENABLING USER INFO POPUP
    // Suported on Firefox
    const hrefs = document.querySelectorAll('aside.profile div.dropdown a');
    for (const href of Array.from(hrefs)) {
      href.removeAttribute('href');
    }
    const dropdownOpens = document.querySelectorAll('aside.profile div.dropdown.pull-right');
    for (const dropdownOpen of Array.from(dropdownOpens)) {
      dropdownOpen.addEventListener('click', (e) => {
        const parent = ((e.target || e.srcElement) as any);
        if (['P', 'LABEL', 'INPUT', 'BUTTON'].includes(parent.nodeName) || !parent.offsetParent) {
          return false;
        }
        if (this.globalSession$.userProfile) {
          const open = parent.offsetParent.classList.toggle('open');
          if (open) {
            e.preventDefault();
          }
        }
        return false;
      });
    }
    // Supported on Firefox
    document.addEventListener('click', (e) => {
      const src = ((e.target || e.srcElement) as any);
      if (src.offsetParent == null || !src.offsetParent.className.match(/dropdown/)) {
        const close = document.querySelectorAll('.profile div.dropdown.open');
        for (const closeElement of Array.from(close)) {
          if (!['SPAN', 'LABEL', 'INPUT', 'BUTTON'].includes(src.nodeName)) {
            closeElement.classList.remove('open');
          }
        }
      }
    }
    );
    // set color of entity
    const aTermsOfUse = document.getElementById('termsOfUseId') as HTMLElement;
    if (aTermsOfUse) {
      aTermsOfUse.style.color = 'var(--aasi-color-base)';
    }
    this.addCheckboxToUserWindow();
    this.addRegionAndLanguageToHeader();
  }

  onClickFavorite(): void {
    this.employeePreferences.MenuFavorite = this.mapFavoriteMenu();
    this.employeePreferences$.saveMenuFavorite(this.employeePreferences).subscribe((p) => {
    });
  }

  mapFavoriteMenu(): string {
    const result: Array<string> = [];
    this.mainMenu.menuItemFavorite.slice().forEach((im) => {
      const newIM = JSON.parse(JSON.stringify(im)) as InternalMenuItemModel;
      result.push(newIM.menuItemModel.permission);
    });
    return result.join('|');
  }

  reorderMainComponents(data: any): void {
    this._appRef.components.sort((a, b) => (a.location.nativeElement.localName === 'app-root') ? -1 : 0);
  }

  getTranslateExternal(): void {
    let regionCode = 'es-ES';
    const listExternalTranslate = JSON.parse(localStorage.getItem(APP_CONSTANTS.TRANSLATION_EXTERNAL_KEY)) as string[];
    const entity = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER));
    if (entity !== null) {
     regionCode = entity.LanguageCode;
    }
    if (!listExternalTranslate || listExternalTranslate.length === 0) {
  
    } else {
      this.checkResolutionAndZoomCompatibility();
      this.detectOldBrowser();
    }
  }

  logoutUser(): void {
    sessionStorage.setItem(APP_CONSTANTS.USER_MENU, JSON.stringify(''));
    this.auth$.logout();
  }

  myFunction(): void {
    this.mydrop = (!this.mydrop);
  }

  onMenuChange(status: boolean): void {
    // this.layout$.isMenuOpen.next(status);
  }

  // empty
  onClickAccount(ev: MouseEvent): void {
    const result = document.getElementsByClassName('dropdown pull-right open');
    setTimeout(() => {
      result[0].className = 'dropdown pull-right';
    }, 0);
  }

  onClickMenu(menuItem: ItemEventInterface): void {
    if (!menuItem.item.target.includes('param')) {
      this.router.navigateByUrl(menuItem.item.target);
    }
  }

  private checkResolutionAndZoomCompatibility(): void {
    const testElem = document.createElement('div');
    const supported: boolean = typeof testElem.style['zoom'] === 'string';
    const baseSize = 1920;

    // Edget I hate you. >:(
    // const screenWidth = (window.navigator.userAgent.indexOf('Edge') > -1) ? this.detectZoomInEdgeBrowser(baseSize) : window.screen.width;

    // Because also it's required by firefox.
    const screenWidth = this.detectZoomInEdgeAndFirefoxBrowser(baseSize);

    if (screenWidth < baseSize) {
      if (!supported) {
        //  Hey Firefox, I hate you too. >:(
        // TODO: Without translate, because this message was not confirmed.
        this.screen$.messages.next(new ScreenResolution({
          type: LowResolutionEnum.ZoomUnsupported,
          title: '',
          message: this.translateExternal$.lowResolutionWithoutZoomMessage
        } as ScreenResolution));
        console.warn('Your browser doesn\'t support automatic zoom.');
      } else {
        // Hey You are using browser in low resolution.
        // TODO: Without translate, because this message was not confirmed.
        this.screen$.messages.next(new ScreenResolution({
          type: LowResolutionEnum.ZoomSupported,
          title: '',
          message: this.translateExternal$.lowResolutionWithZoomMessage
        } as ScreenResolution));
        console.warn('Low resolution.');
      }
    }
  }
  private detectZoomInEdgeAndFirefoxBrowser(baseSize: number): number {
    // NOTE: Diagram in notebook (OQL).
    let result: number;
    let diffZoom: number;
    const currentSize = window.screen.width;
    const currentZoom = (window.devicePixelRatio - 1);
    const diffSize = (baseSize - currentSize);

    diffZoom = (diffSize * 100) / currentSize;
    // Avoid division between 0.
    diffZoom = (diffZoom !== 0) ? (diffZoom / 100) : 0;

    result = (currentZoom === diffZoom) ? baseSize : currentSize;

    return result;
  }
  private detectOldBrowser(): void {
    // TODO: Our implementation
    // const browserRegExp = new RegExp(/(Chrome|OPR|Firefox|Edge|Trident)(?:|\/)([\d\.apre]+)/, 'gis');
    // // console.log(browserRegExp[Symbol.match](window.navigator.userAgent));
    const browserSupported = this.configService.getBrowserListSupported();
    if (browserSupported) {
      const supportedVersion = browserSupported[this.device$.browser];
      const notifyOptions = { timeOut: 70000 };
      if (supportedVersion) {
        // NOTE: Supported browser.
        const localVersion = this.device$.browser_version.includes('.')
          ? this.device$.browser_version.split('.')[0]
          : this.device$.browser_version;
        if (Number(localVersion) < Number(supportedVersion)) {
          setTimeout(() => {
            this.notificationManager$.showWarning(
              this.translateExternal$.unsupportedBrowserTitle,
              this.translateExternal$.oldBrowserMessage,
              notifyOptions
            );
          }, 0);
        }
      } else {
        // NOTE: Unsupported browser.
        setTimeout(() => {
          this.notificationManager$.showWarning(
            this.translateExternal$.unsupportedBrowserTitle,
            this.translateExternal$.unsupportedBrowserMessage,
            notifyOptions
          );
        }, 0);
      }
    }
  }

// funciones
private removeDarkMode(): void {
  this.getDarkIndicator().classList.remove('checked');
  this.getLightIndicator().classList.add('checked');

  DarkMode.removeDarkMode();
  this.setNewColorsFromImages(false);
}
// funciones
private addCheckboxToUserWindow(): void {
  const parent = document.querySelector('aside.profile').firstElementChild.children[1];
  const darkModeContainer = document.createElement('div');
  darkModeContainer.classList.add('dark-mode-container');
  const labels = {
    theme: 'Themes',
    light: 'Light',
    dark:  'Dark'
 };
  darkModeContainer.innerHTML = `
   <span id="theme-label">${labels.theme}</span>
   <div class="modes-container">
    <div id="light-mode-indicator"><button type="button">${labels.light}</button></div>
    <div id="dark-mode-indicator"><button type="button">${labels.dark}</button></div>
   </div>
 `;
  parent.appendChild(darkModeContainer);
  if (this.globalSession$.darkMode) {
   this.setDarkMode();
 } else {
   this.removeDarkMode();
 }
  this.getLightIndicator().addEventListener('click', () => {
   this.globalSession$.darkMode = false;
   this.removeDarkMode();
 });
  this.getDarkIndicator().addEventListener('click', () => {
   this.globalSession$.darkMode = true;
   this.setDarkMode();
 });
}
// end Funciones
 /*themes color*/

/*end theme color*/
// setDarkMode
// const browserSupported = this.configService.getBrowserListSupported();

  private setDarkMode(): void {
    this.getDarkIndicator().classList.add('checked');
    this.getLightIndicator().classList.remove('checked');

    DarkMode.setDarkMode();
    this.setNewColorsFromImages(true);
  }
  private getDarkIndicator(): Element {
    return document.getElementById('dark-mode-indicator').firstElementChild;
  }
  private getLightIndicator(): Element {
    return document.getElementById('light-mode-indicator').firstElementChild;
  }
  private setNewColorsFromImages(isDarkMode: boolean): void {
    const eSettings = this.globalSession$.currentLegalEntity.getValue();
    if (eSettings) {
      const entityColor = eSettings.VisualIDentity ?
        ColorsPalette.getMyPalette(eSettings.VisualIDentity) :
        ColorsPalette.getMyPalette('#000000');
      SetMyPalette.addEntityToSVGInCSS(entityColor, this.configService, isDarkMode);
    } else {
      if (isDarkMode) {
        const root = document.documentElement.style;
        this.modeDark = false;
        this.globalSession$.setIsDarkMode(this.modeDark);
      } else {
        this.modeDark = true;
        this.globalSession$.setIsDarkMode(this.modeDark);
        const root = document.documentElement.style;
        root.removeProperty('--url-sprite-external-icons');
      }
    }
  }
  private setURLforSVGImages(): void {
    const head = document.getElementsByTagName('head')[0];
    let css = ':root{';
    // this.configService.getSVGImagesList(true).forEach((item) => {
    //   if (item.includes('-mi-')) {
    //     item.includes('white-') ?
    //       css += `--url-sprite-${item}: url("${this.configService.get('apiUrl')}/Images/sprite-${item.substring(9, item.length)}.svg?l=ffffff&b=ffffff&d=ffffff");` :
    //       css += `--url-sprite-${item}: url("${this.configService.get('apiUrl')}/Images/sprite-${item.substring(8, item.length)}.svg?l=cccccc&b=cccccc&d=cccccc");`;
    //   } else {
    //     css += `--url-sprite-${item}: url("${this.configService.get('apiUrl')}/Images/sprite-${item}.svg");`;
    //   }
    // });
    css += '}';
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    // Temp contextual menu sprite
    const root = document.documentElement.style;
    root.setProperty('--url-sprite-contextual-menu', `url("${this.configService.get('apiUrl')}/Images/sprite-contextual-menu.svg")`);
  }

// end setDarkMode
  private addRegionAndLanguageToHeader(): void {
    let regionName = 'es-ES';
    let languageName = 'es-ES';
    const entity =  JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER)) as string[];
    if (entity !== null) {
    regionName = this.entity.RegionCode;
    languageName = this.entity.LanguageCode;
    }
    const i18n = {
      region: this.translate$.getDirectTranslation('COMMON_LAYOUT.REGION_LABEL', 'Region'),
      language: this.translate$.getDirectTranslation('COMMON_LAYOUT.LANGUAGE_LABEL', 'Language'),
      title: this.translate$.getDirectTranslation('COMMON_TRANSLATE_PANEL.TRANSLATE_TITLE', 'Translate'),
    };
    const firstAside = document.querySelector('header.hidden-xs').firstElementChild;
    firstAside.appendChild(document.createElement('div'));
    const entitySpace = document.querySelector('header.hidden-xs').children[1];
    const toAppend = document.createElement('div');
    toAppend.innerHTML = `
      <section class="rl-codes">
        <div><i class="fas fa-globe-americas"></i><span id="header-region-code" data-name="${i18n.region}" data-value="${regionName}"></span></div>
        <div><i class="fas fa-flag" id="flag-icon" title="${i18n.title}"></i><span id="header-language-code" data-name="${i18n.language}" data-value="${languageName}"></span></div>
      </section>`;
    entitySpace.insertBefore(toAppend.firstElementChild, entitySpace.firstElementChild);
    const flagIcon = document.querySelector('.fa-flag');
    flagIcon.addEventListener('click', this.handleClickOnFlag.bind(this));
  }
  private handleClickOnFlag(): void {
    const entity = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER));
    (new TranslateLocalstorageLoader(null)).removeCache();
    this.translate$.translations[entity.LanguageCode] = undefined;
    this.translate$.getTranslation(entity.LanguageCode);
  }
}

