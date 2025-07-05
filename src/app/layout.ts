import { LanguageSwitcherComponent } from '@/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '@/components/theme-switcher/theme-switcher.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [ThemeSwitcherComponent, LanguageSwitcherComponent],
  template: `
    <section class="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <app-theme-switcher />
      <app-language-switcher />
      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
