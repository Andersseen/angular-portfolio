import { Component } from '@angular/core';
import Footer from './footer';
import Nav from './nav';

@Component({
  selector: 'app-layout',
  imports: [Footer, Nav],
  template: `
    <section class="min-h-screen bg-white transition-colors duration-300 dark:bg-neutral-900">
      <app-nav />

      <ng-content select="app-pages" />

      <app-footer />
    </section>
  `,
})
export default class Layout {}
