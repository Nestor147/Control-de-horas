import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TimesheetPublicClientApplicationService,
  AuthDataService,
  AzureConfigData,
  MsalGuardConfigDataService,
  MsalInterceptorConfigDataService
} from './data-providers';
import { AuthService, UserService } from './providers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MsalModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthDataService,
    AzureConfigData,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: MSAL_INSTANCE,
          useClass: TimesheetPublicClientApplicationService,
          deps: [AzureConfigData]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useClass: MsalGuardConfigDataService,
          deps: [AuthDataService]
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useClass: MsalInterceptorConfigDataService,
          deps: [AuthDataService]
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService
      ]
    };
  }
}
