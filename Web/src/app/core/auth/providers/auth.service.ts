import { ApplicationRef, Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../common/services/config.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GlobalSessionService } from '../../../services/session/global-session.service';
import { MsalBroadcastService, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { UserService } from './user.service';
import { EmployeeProfile } from '../models';


export const POST_LOGIN_URL_KEY = 'post_login_redirect_url';

@Injectable()
export class AuthService {
  lastRouteBeforeEntityGuard: BehaviorSubject<string>;
  canSelectLastMenuItem: BehaviorSubject<boolean>;
  redirectInterval: any;

  private readonly showConsoleMsg: boolean;
  private readonly afterLoginRedirectTo: string;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private globalSession$: GlobalSessionService,
    private _appRef: ApplicationRef,
    private user$: UserService,
    private azureAd$: MsalService,
    private azureAdBroadcast$: MsalBroadcastService
  ) {
    this.afterLoginRedirectTo = '/entity-selection';
    this.showConsoleMsg = this.configService.get('environment') === 'DEV';
    this.lastRouteBeforeEntityGuard = new BehaviorSubject<string>(null);
    this.canSelectLastMenuItem = new BehaviorSubject<boolean>(false);

    this.azureAdBroadcast$.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
      mergeMap(d => {
        return this.user$.getMe().pipe(map(me => ({ eventMessage: d, apiUser: me })));
      })
    ).subscribe((result: { eventMessage: EventMessage, apiUser: EmployeeProfile }) => {
      result.apiUser.Employeename = result.apiUser.Employeename.split('@')[0];
      this.azureAd$.instance.setActiveAccount((result.eventMessage.payload as AuthenticationResult).account);
      this.globalSession$.userProfile.next(result.apiUser);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return of(!!this.azureAd$.instance.getActiveAccount());
  }

  login(): void {
    this.azureAd$.loginRedirect().subscribe();
  }

  logout(): void {
    this.azureAd$.logoutRedirect({
      account: this.azureAd$.instance.getActiveAccount()
    }).subscribe();
  }

  backToSavedRoute(): void {
    this.lastRouteBeforeEntityGuard.subscribe(lastRoute => {
      if (lastRoute !== null) {
        this.recursiveRedirect(lastRoute);
      }
    });
  }

  recursiveRedirect(url: string): void {
    if (url === this.router.url) {
      this.router.navigate(['/welcome']).then(resp => {
          if (resp) {
            this.clearOldUrls();
          }
        }
      );
      return;
    }
    this.canSelectLastMenuItem.next(true);
    this.router.navigate([url]).then(resp => {
      if (resp) {
        const searchButton = document.getElementById('inputSearchId');
        if (searchButton) {
          searchButton.focus();
        }
        this.clearOldUrls();
      }
    });
  }

  thereIsPreviousRoute(): boolean {
    return this.lastRouteBeforeEntityGuard.getValue() !== null;
  }

  async authBootstrap<TAppBootstrapper>(main: Type<TAppBootstrapper>): Promise<void> {
    await this.azureAd$.instance.initialize();
    await this.azureAd$.instance.handleRedirectPromise();
    this._appRef.bootstrap(MsalRedirectComponent);

    if (this.azureAd$.instance.getAllAccounts()?.length > 0) {
      this._appRef.bootstrap(main);
    }
  }

  private clearOldUrls(): void {
    clearInterval(this.redirectInterval);
    this.lastRouteBeforeEntityGuard = new BehaviorSubject<string>(null);
    sessionStorage.removeItem(POST_LOGIN_URL_KEY);
    this._appRef.tick();
  }

  private log(msg: string | any, ...args: Array<any>): void {
    if (this.showConsoleMsg) {
      let msgs = msg;
      args.forEach(d => { msgs += d; });
      // console.log(msgs);
    }
  }

  private warn(msg: string | any, ...args: Array<any>): void {
    if (this.showConsoleMsg) {
      let msgs = msg;
      args.forEach(d => { msgs += d; });
      console.warn(msgs);
    }
  }
}
