import LanguageSwitcher from '@/components/language-switcher';
import Magnet from '@/components/magnet';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcher, Magnet],
  template: `
    <section class="bg-background text-foreground overflow-hidden transition-colors duration-300">
      <!-- <app-theme-switcher /> -->
      <app-magnet>
        <app-language-switcher />
      </app-magnet>

      <ng-content select="app-pages" />
    </section>
  `,
})
export default class Layout {}
