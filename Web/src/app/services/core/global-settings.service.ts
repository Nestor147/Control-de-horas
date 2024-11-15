import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GlobalSetting } from '../../models/core/global-setting';
import { GlobalSessionService } from '../session/global-session.service';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalSettingService {
  defaultLanguageObserver: Subject<string>;
  enableTranslation: BehaviorSubject<boolean>;
  defaultLanguage: BehaviorSubject<string>;
  version: BehaviorSubject<string>;
  build: BehaviorSubject<string>;
  testOnly: BehaviorSubject<boolean>;
  enableHelpTool: BehaviorSubject<boolean>;
  helpToolUrl: BehaviorSubject<string>;
  translationAllowedRoles: BehaviorSubject<Array<string>>;
  onlineAccessAdminRoles: BehaviorSubject<Array<string>>;
  private apiUrl: string;
  private _settings: Array<GlobalSetting>;

  constructor(private http: HttpClient) {
    this.apiUrl = '/core/settings';
    this._settings = [];
    this.enableTranslation = new BehaviorSubject<boolean>(null);
    this.defaultLanguage = new BehaviorSubject<string>(null);
    this.version = new BehaviorSubject<string>(null);
    this.build = new BehaviorSubject<string>(null);
    this.testOnly = new BehaviorSubject<boolean>(null);
    this.enableHelpTool = new BehaviorSubject<boolean>(null);
    this.helpToolUrl = new BehaviorSubject<string>(null);
    this.translationAllowedRoles = new BehaviorSubject<Array<string>>(null);
    this.onlineAccessAdminRoles = new BehaviorSubject<Array<string>>(null);
    this.defaultLanguageObserver = new Subject<string>();
  }

  getAllSettingsFromHttp(): Observable<Array<GlobalSetting>> {
    return this.http.get<Array<GlobalSetting>>(this.apiUrl + '/all').pipe(
      tap(gsList => {
        this._settings = gsList;
        this._settings.forEach(gsItem => {
          switch (gsItem.Setting) {
            case 'EnableTranslation':
              this.enableTranslation.next(JSON.parse(gsItem.Value));
              this.enableTranslation.complete();
              break;
            case 'DefaultLanguage':
              this.defaultLanguage.next(gsItem.Value);
              this.defaultLanguage.complete();
              break;
            case 'version':
              this.version.next(gsItem.Value);
              this.version.complete();
              break;
            case 'build':
              this.build.next(gsItem.Value);
              this.build.complete();
              break;
            case 'TestOnly':
              this.testOnly.next(JSON.parse(gsItem.Value));
              this.testOnly.complete();
              break;
            case 'EnableHelpTool':
              this.enableHelpTool.next(JSON.parse(gsItem.Value));
              this.enableHelpTool.complete();
              break;
            case 'HelpToolUrl':
              this.helpToolUrl.next(gsItem.Value);
              this.helpToolUrl.complete();
              break;
            case 'TranslationAllowedRoles':
              this.translationAllowedRoles.next(gsItem.Value.split('|'));
              this.translationAllowedRoles.complete();
              break;
            case 'OnlineAccessAdminRoles':
              this.onlineAccessAdminRoles.next(gsItem.Value.split(','));
              this.onlineAccessAdminRoles.complete();
              break;
          }
        });
        if (this.defaultLanguage.getValue()) {
          this.defaultLanguageObserver.next(this.defaultLanguage.getValue());
        }
      })
    );
  }

  userCanTranslateObservable(): BehaviorSubject<boolean> {

    const a = new BehaviorSubject<boolean>(null);
    a.next(true);
    return a;
  }

  userCanTranslateStatic(): boolean {
    // const userRoles = this.session$.currentUserGroups.getValue().map(i => i.name);
    // const translationRoles: Array<string> = this.translationAllowedRoles.getValue();
    // let can = false;
    // userRoles.forEach(uRol => {
    //   if (translationRoles && translationRoles.includes(uRol)) {
    //     can = true;
    //   }
    // });
    return true;
  }
}
