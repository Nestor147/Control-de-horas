import { Injectable } from '@angular/core';
import { BrowserAuthOptions, BrowserCacheLocation, BrowserSystemOptions, CacheOptions, Configuration, LogLevel } from '@azure/msal-browser';
import { BrowserTelemetryOptions } from '@azure/msal-browser/dist/config/Configuration';
import { AuthDataService } from './auth-data.service';

@Injectable()
export class AzureConfigData implements Configuration {
  get auth(): BrowserAuthOptions {
    return {
      clientId: this.authData$.clientId,
      authority: `${this.authData$.instance}/${this.authData$.tenantId}`,
      knownAuthorities: [
        `${this.authData$.instance}/${this.authData$.tenantId}/v2.0`
      ],
      navigateToLoginRequestUrl: true,
      redirectUri: this.authData$.frontEndUrl + '/entity-selection',
      postLogoutRedirectUri: this.authData$.frontEndUrl,
    } as BrowserAuthOptions;
  }

  get cache(): CacheOptions {
    return {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: (window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1)
    };
  }

  get system(): BrowserSystemOptions {
    return {
      allowNativeBroker: false,
      loggerOptions: {
        loggerCallback: (level, message) => {
          // console.info(message);
        },
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    };
  }

  telemetry: BrowserTelemetryOptions;

  constructor(private authData$: AuthDataService) {}
}
