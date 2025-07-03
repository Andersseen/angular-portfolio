import { Component } from '@angular/core';
import Layout from './layout';
import Pages from './pages';

@Component({
  selector: 'app-portfolio',
  imports: [Layout, Pages],
  template: `
    <app-layout>
      <app-pages />
    </app-layout>
  `,
})
export default class Portfolio {}
