import { Component, ElementRef, viewChild } from '@angular/core';
import StickyCursorComponent from '../components/sticky-cursor';
import Footer from './footer';
import Navbar from './navbar';

@Component({
  selector: 'app-layout',
  imports: [Footer, Navbar, StickyCursorComponent],
  template: `
    <section class="min-h-screen">
      <app-navbar />
      <button #target class="bg-primary-500 h-32 w-32 rounded-md">Hover me</button>
      <ng-content select="app-pages" />

      <app-footer />
    </section>

    <and-sticky-cursor [stickyElement]="el()" />
  `,
})
export default class Layout {
  public el = viewChild<ElementRef<HTMLElement>>('target');
}
