import { GlobalDataConfig } from '@aasinet/ngx-controls/interfaces/global';
import { ErrorData } from '@aasinet/ngx-controls/models/a-modal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { CultureInfo, RegionInfo } from '@aasinet/ngx-controls/models/i18n';
import { EnvironmentTypeEnum } from '@aasinet/ngx-controls/enums/global';
import { ConfigService } from '../../common/services/config.service';
import { GlobalSettingService } from './global-settings.service';
import { GlobalSessionService } from '../session/global-session.service';
import { map } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StaticInjector } from '@aasinet/ngx-controls/utils/app';

/** TODO: These elements should not have a disabled property, they should be refactored. */
const aasiNetCustomComponents = ['QUILL', 'ACCOUNT-PERIOD-SELECTION', 'TAB', 'TABS', 'ORDER-BY-LIST', 'PERIOD-SELECTION'];

@Injectable({ providedIn: 'root' })
export class ControlsDataService implements GlobalDataConfig {

  get darkModeStorageConstant(): string {
    return 'AASI_SESSION:DarkMode';
  }

  get environment(): EnvironmentTypeEnum {
    return this._environment;
  }

  set environment(data: EnvironmentTypeEnum) {
    this._environment = data;
  }

  get errorData(): ErrorData {
    return this._errorData;
  }

  set errorData(data: ErrorData) {
    this._errorData = data;
  }

  get isTranslationEnabled(): boolean {
    // return this.globalSetting$.enableTranslation.getValue(); Agregar mas Adelante Orcarcop
    return true;
  }

  get menuOpenStorageConstant(): string {
    return 'menuOpen';
  }

  get isHelpDocumentationEnabled(): boolean {
    return this.globalSetting$.enableHelpTool.getValue();
  }

  get helpDocumentationUrl(): string {
    return this.globalSetting$.helpToolUrl.getValue();
  }

  get userCanTranslate$(): BehaviorSubject<boolean> {
    const a = new BehaviorSubject<boolean>(null);
    a.next(true);
    return a;
    // return this.userCanTranslateSource$;  verificar Orcarcop
  }

  userCanTranslateSource$: BehaviorSubject<boolean>;
  defaultLanguage$: BehaviorSubject<string>;

  currentCultureInfo$: Observable<CultureInfo>;
  currentRegionInfo$: Observable<RegionInfo>;

  customElementsAllowDisabled: HTMLElementTagNameMap[] | string[];

  private _environment: EnvironmentTypeEnum;
  private _errorData: ErrorData;

  constructor(
    private config$: ConfigService,
    private globalSetting$: GlobalSettingService,
    private globalSession$: GlobalSessionService,
  ) {
    this.userCanTranslateSource$ = this.globalSetting$.userCanTranslateObservable();
    this.defaultLanguage$ = this.globalSetting$.defaultLanguage;
    this.currentRegionInfo$ = merge(
      this.globalSetting$.defaultLanguageObserver,
      this.globalSession$.currentLegalEntity
    ).pipe(
      map(d => {
        if (typeof d === 'string') {
          if (this.globalSession$.currentLegalEntity.getValue()?.RegionCode) {
            return {
              regionCode: 'es-ES',
              defaultLanguage: d
            };
          }
          return {
            regionCode: this.globalSession$.currentLegalEntity.getValue()?.RegionCode,
            defaultLanguage: this.globalSession$.currentLegalEntity.getValue()?.LanguageCode
          };
        } else {
          return {
            regionCode: d?.RegionCode,
            defaultLanguage: d?.LanguageCode
          };
        }
      })
    );

    this._environment = this.config$.get('environment') as EnvironmentTypeEnum;
    this._errorData = new ErrorDataProvider();

    this.customElementsAllowDisabled = ['DIV', 'SECTION', 'ARTICLE', ...aasiNetCustomComponents];
  }
}


class ErrorDataProvider implements ErrorData {
  get browserInfo(): string {
    const deviceDetector$ = StaticInjector.instance.get(DeviceDetectorService);
    return deviceDetector$.browser + ' - ' + deviceDetector$.browser_version;
  }

  get date(): string {
    return (new Date(Date.now())).toCustomDateString();
  }

  get dbData(): string {
    const globalSetting$ = StaticInjector.instance.get(GlobalSettingService);
    if (globalSetting$.version.getValue()) {
      if (globalSetting$.build.getValue()) {
        return globalSetting$.version.getValue() + ' - ' + globalSetting$.build.getValue();
      } else {
        return globalSetting$.version.getValue();
      }
    } else {
      return 'None';
    }
  }

  get entityCode(): string {
    const globalSession$ = StaticInjector.instance.get(GlobalSessionService);
    return globalSession$.currentLegalEntity.value ? globalSession$.currentLegalEntity.value.Code : 'None';
  }

  get frontEndData(): string {
    const config$ = StaticInjector.instance.get(ConfigService);
    return config$.get('version') + ' - ' + config$.get('build');
  }

  get serverData(): string {
    return 'v. 1001';
  }

  get url(): string {
    return window.location.href;
  }

  get user(): string {
    const globalSession$ = StaticInjector.instance.get(GlobalSessionService);
    return !!globalSession$.userAsProfileModel ? globalSession$.userAsProfileModel.username : 'None';
  }
}
