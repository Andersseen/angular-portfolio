import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PreloaderComponent from '../components/preloader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent],
  template: `
    <app-preloader />
    <router-outlet />
  `,
})
export default class Container {}
