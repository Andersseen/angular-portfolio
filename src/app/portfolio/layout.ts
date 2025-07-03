import { Component } from '@angular/core';
import Footer from './footer';
import Navbar from './navbar';

@Component({
  selector: 'app-layout',
  imports: [Footer, Navbar],
  template: `
    <section class="min-h-screen">
      <app-navbar />

      <ng-content select="app-pages" />

      <app-footer />
    </section>
  `,
})
export default class Layout {}
