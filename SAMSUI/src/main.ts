import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import '../node_modules/echarts/theme/macarons.js';
import '../node_modules/echarts/theme/roma.js';
import '../node_modules/echarts/theme/shine.js';
import '../node_modules/echarts/theme/vintage.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
