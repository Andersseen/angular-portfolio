import { bootstrapApplication } from '@angular/platform-browser';
import appConfig from './app/app.config';
import Container from './app/container';

bootstrapApplication(Container, appConfig).catch((err) => console.error(err));
