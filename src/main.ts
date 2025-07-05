import { bootstrapApplication } from '@angular/platform-browser';
import config from './app/config';
import Container from './app/container';

bootstrapApplication(Container, config).catch((err) => console.error(err));
