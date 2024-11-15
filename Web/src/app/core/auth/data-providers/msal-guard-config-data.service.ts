import { Injectable } from '@angular/core';
import { MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { AuthDataService } from './auth-data.service';
import { MsalGuardAuthRequest } from '@azure/msal-angular/msal.guard.config';

@Injectable()
export class MsalGuardConfigDataService implements MsalGuardConfiguration {
  get interactionType(): InteractionType.Popup | InteractionType.Redirect {
    return InteractionType.Redirect;
  }

  get authRequest(): MsalGuardAuthRequest {
    return {
      scopes: this.authData$.scope
    };
  }

  constructor(private authData$: AuthDataService) {}
}
