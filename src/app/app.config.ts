import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
};
export default appConfig;
