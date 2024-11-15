import { CoreComponentsModule } from './core/components/core-components.module';
import { ApplicationRef, DoBootstrap, Inject, Injector, NO_ERRORS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AasinetLayoutModule } from '@aasinet/ngx-layout';
import { TranslateLoader, TranslateModule } from '@aasinet/ngx-controls/translate';
import { GlobalDataService } from '@aasinet/ngx-controls/services';
import { AModalModule } from '@aasinet/ngx-controls/a-modal';
import { I18nStringService } from '@aasinet/ngx-controls/i18n';
import { NotificationModule } from '@aasinet/ngx-controls/notification';
import { EnvironmentIndicatorModule } from '@aasinet/ngx-controls/environment-indicator';

import { ConfigService } from './common/services/config.service';
import { NgProgressConfig, NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AasiNetDataInterceptor, ExtraHeadersInterceptor, HttpErrorInterceptor } from './core/interceptors';

import { ControlsDataService } from './services/core/controls-data.service';
import { NgxControlsI18nService } from './services/core/ngx-controls-i18n.service';
import { SpeedNetworkService } from './services/core/speed-network.service';
import { AppCustomPreloader } from './core/helpers/app-custom-preloader';

import { TranslateLocalstorageLoader } from './core/components/translator/translate-localstorage-loader';

import { SessionFinisherService } from './services/session/session-finisher.service';
import { APP_CONSTANTS } from './app.constants';
import { DarkMode } from './core/helpers/dark-mode';
import { VTranslateComponent } from './modules/shell/v-translate.component';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { AuthModule, AuthService } from './core/auth';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalCustomNavigationClient, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Location } from '@angular/common';
import { Router, provideRouter } from '@angular/router';
import { StaticInjector } from '@aasinet/ngx-controls/utils/app';
import { CurrencyPipe } from '@aasinet/ngx-controls/pipes';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeComponent } from './modules/shell/welcome.component';

export function configFactory(): ConfigService {
  return ConfigService.getInstance();
}

export const CONFIG_PROVIDER: Provider = {
  provide: ConfigService,
  useFactory: configFactory
};

export const INTERCEPTORS_PROVIDER: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AasiNetDataInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ExtraHeadersInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  }
];

export const PROGRESS_CONFIG: NgProgressConfig = {
  color: '#e8f2fb',
  spinner: false
};

export const NGX_MODULES = [
  AModalModule,
  TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useClass: TranslateLocalstorageLoader, deps: [HttpClient] }
  }),
  EnvironmentIndicatorModule
];

export const NGX_PROVIDERS = [
  { provide: GlobalDataService, deps: [ControlsDataService] },
  { provide: I18nStringService, useClass: NgxControlsI18nService }
];

@NgModule({
  exports: [],
  declarations: [
    AppComponent,

  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AasinetLayoutModule,
    FormsModule,
    ROUTING,
    CoreComponentsModule,
    NotificationModule,
    NgProgressModule.withConfig(PROGRESS_CONFIG),
    NgProgressHttpModule,
    BrowserAnimationsModule,

    NGX_MODULES,
    AuthModule.forRoot(),
    DashboardComponent,WelcomeComponent,
    VTranslateComponent
  ],
  providers: [
    CONFIG_PROVIDER,
    INTERCEPTORS_PROVIDER,
    SpeedNetworkService,
    CurrencyPipe,
    AppCustomPreloader, // remove
    NGX_PROVIDERS,
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'This field is required',
          minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class AppModule {
  constructor(
    private sessionFinisher$: SessionFinisherService,
    private auth$: AuthService,

    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuth$: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private location: Location,
    private injector: Injector

  ) {
    StaticInjector.instance = injector;
    this.sessionFinisher$.initializeChecker();
    window.addEventListener('storage', (ev: StorageEvent) => {
      if (ev.key === APP_CONSTANTS.DARK_MODE_KEY) {
        DarkMode.checkAndChangeDarkMode(ev.newValue);
      }
    });
    // NOTE: Hack for navigation over angular routing controller.
    this.msalAuth$.instance.setNavigationClient(new MsalCustomNavigationClient(this.msalAuth$, this.router, this.location));
  }
}

