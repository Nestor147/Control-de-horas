import { Injectable } from '@angular/core';
import { MsalInterceptorConfiguration, ProtectedResourceScopes } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { AuthDataService } from './auth-data.service';

@Injectable()
export class MsalInterceptorConfigDataService implements MsalInterceptorConfiguration {
  get aansScope(): string {
    return this.authData$.scope.filter(d => d.includes(this.authData$.clientId))[0];
  }

  get interactionType(): InteractionType.Popup | InteractionType.Redirect {
    return InteractionType.Redirect;
  }

  get protectedResourceMap(): Map<string, Array<string | ProtectedResourceScopes> | null> {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set('api/*', [this.aansScope]);

    return protectedResourceMap;
  }

  constructor(private authData$: AuthDataService) {}
}
