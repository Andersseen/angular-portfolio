import { LanguageSwitcherComponent } from '@/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '@/components/theme-switcher/theme-switcher.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [ThemeSwitcherComponent, LanguageSwitcherComponent],
  template: `
    <section class="overflow-hidden bg-neutral-50 transition-colors duration-300 dark:bg-neutral-900">
      <app-theme-switcher />
      <app-language-switcher />
      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
