import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PreloaderComponent from '../components/preloader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent],
  template: `
    <app-preloader [delay]="500" />
    <router-outlet />
  `,
})
export default class Container {}
