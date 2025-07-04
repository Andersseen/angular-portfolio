import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import appRoutes from './app.routes';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(appRoutes, withViewTransitions()),
  ],
};
export default appConfig;
