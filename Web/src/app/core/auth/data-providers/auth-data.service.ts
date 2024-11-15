import { Injectable } from '@angular/core';
import { ConfigService } from '../../../common/services/config.service';
import { AuthConfig } from '../models';

@Injectable()
export class AuthDataService implements AuthConfig {
  get clientId(): string {
    return this.config$.getAuthConfig().clientId;
  }

  get instance(): string {
    return this.config$.getAuthConfig().instance;
  }

  get scope(): string[] {
    return this.config$.getAuthConfig().scope;
  }

  get tenantId(): string {
    return this.config$.getAuthConfig().tenantId;
  }

  get backEndUrl(): string {
    return this.config$.getBackEndUrl();
  }

  get frontEndUrl(): string {
    return this.config$.getFrontEndUrl();
  }

  constructor(private config$: ConfigService) {
    if (!this.config$.getAuthConfig()) {
      throw Error('There is no auth configuration.');
    }
  }
}
