import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from 'environments';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

var Gpio = require('onoff').Gpio;
var ledYel = new Gpio(12, 'out');

ledYel.writeSync(Gpio.HIGH);
