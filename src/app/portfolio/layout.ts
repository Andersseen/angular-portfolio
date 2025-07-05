import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-layout',
  imports: [ThemeSwitcherComponent],
  template: `
    <section class="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <app-theme-switcher />
      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
