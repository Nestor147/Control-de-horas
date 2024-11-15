import { Injectable } from '@angular/core';
import { BROWSERS, DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../common/services/config.service';
import { GlobalSessionService } from './session/global-session.service';
import { ColorsPalette } from '@aasinet/ngx-controls/utils/theme';
import { ThemePalette } from '@aasinet/ngx-controls/interfaces/theme';
@Injectable({ providedIn: 'root' })
export class HeadDOMHandlingService {
  private readonly applicationName: string;

  private get entityPalette(): ThemePalette {
    return ColorsPalette.getMyPalette(
      this.globalSession$.currentLegalEntity.getValue()?.VisualIDentity
    );
  }
  private get entityNameInAASINet(): string {
    return `${this.applicationName} - ${this.globalSession$.currentLegalEntity.getValue()?.Name}`;
  }
  constructor(
    private config$: ConfigService,
    private deviceDetector$: DeviceDetectorService,
    private globalSession$: GlobalSessionService
  ) {
    this.applicationName = 'AANS.net';
    if ([BROWSERS.CHROME, BROWSERS.FIREFOX, BROWSERS.MS_EDGE_CHROMIUM, BROWSERS.OPERA].includes(this.deviceDetector$.browser)) {
      document.querySelector('[rel="alternate icon"]')?.remove();
    }
  }

  changeHeadEntityIdentityColorFromSession(): void {
    this.internalChangeHeadEntityIdentity(this.entityPalette.base.substring(1));
  }

  changeHeadEntityIdentityColorToGray(): void {
    this.internalChangeHeadEntityIdentity(ColorsPalette.grayColor);
  }
  internalChangeHeadEntityIdentity(entityColor: string): void {
    document.querySelectorAll('[data-favicon]').forEach(d => {
      d.setAttribute('href', `${this.config$.get('apiUrl')}/Images/favicon.svg?l=ffffff&b=${this.entityPalette.base.substring(1).toUpperCase()}&d=ffffff`);
    });
    document.querySelectorAll('[data-favicon-content]').forEach(d => {
      d.setAttribute('content', `#${entityColor}`);
    });
    document.querySelectorAll('[data-favicon-color]').forEach(d => {
      d.setAttribute('color', `#${entityColor}`);
    });
    document.querySelectorAll('[data-application-name]').forEach(d => {
      if (this.globalSession$.currentLegalEntity.getValue()) {
        d.setAttribute('content', this.entityNameInAASINet);
      }
    });
    document.querySelector('[rel="manifest"]')?.setAttribute('href', this.getSiteWebmanifest());
  }
  private getSiteWebmanifest(): string {
    let name = this.applicationName;
    let shortName = this.applicationName;

    let startUrl = document.querySelector('base').href.replace(location.origin, '');
    if (this.globalSession$.currentLegalEntity.getValue()?.Code) {
      startUrl += `${this.globalSession$.currentLegalEntity.getValue()?.Code}/welcome`;
      shortName += ` - ${this.globalSession$.currentLegalEntity.getValue()?.Code}`;
    } else {
      startUrl += '/welcome';
    }
    if (this.globalSession$.currentLegalEntity.getValue()?.Code && this.globalSession$.currentLegalEntity.getValue()?.Name) {
      name += ` - ${this.globalSession$.currentLegalEntity.getValue()?.Code} - ${this.globalSession$.currentLegalEntity.getValue()?.Name}`;
    }
    const webmanifest = {
      background_color: this.entityPalette.base,
      theme_color: this.entityPalette.base,
      description: this.entityNameInAASINet,
      display: 'standalone',
      icons: [
        {
          src: `${this.config$.get('apiUrl')}/Images/favicon.svg?l=ffffff&b=${this.entityPalette.base.substring(1)}&d=ffffff`,
          sizes: 'any'
        },
      ],
      name,
      short_name: shortName,
      startUrl,
    };
    return 'data:application/manifest+json,' + encodeURIComponent(JSON.stringify(webmanifest));
  }
}
