import { Component } from '@angular/core';
import Layout from './layout';
import Pages from './pages';

@Component({
  imports: [Layout, Pages],
  template: `
    <app-layout>
      <app-pages />
    </app-layout>
  `,
})
export default class Portfolio {}
