import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import routes from './routes';

const config: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideRouter(routes, withViewTransitions()),
  ],
};
export default config;
