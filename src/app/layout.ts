import LanguageSwitcher from '@/components/language-switcher/language-switcher.component';
import ThemeSwitcher from '@/components/theme-switcher';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeSwitcher, LanguageSwitcher],
  template: `
    <section class="bg-background text-foreground overflow-hidden transition-colors duration-300">
      <app-theme-switcher />
      <app-language-switcher />
      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
