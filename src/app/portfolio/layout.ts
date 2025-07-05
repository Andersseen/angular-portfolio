import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [],
  template: `
    <section class="min-h-screen">
      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
