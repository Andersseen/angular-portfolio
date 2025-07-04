import { Component } from '@angular/core';
import CursorComponent from '../components/cursor/index';
import Footer from './footer';
import Navbar from './navbar';

@Component({
  selector: 'app-layout',
  imports: [Footer, Navbar, CursorComponent],
  template: `
    <section class="min-h-screen">
      <app-navbar />
      <and-cursor />
      <ng-content select="app-pages" />

      <app-footer />
    </section>
  `,
})
export default class Layout {}
