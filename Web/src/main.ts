import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigService } from './app/common/services/config.service';

if (environment.production) {
  enableProdMode();
}

ConfigService.loadInstance('config/config.json').then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
});


