import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from '../components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-nav',
  imports: [LanguageSwitcherComponent, ThemeSwitcherComponent],
  template: `
    <nav>
      <app-theme-switcher />
      <app-language-switcher />
    </nav>
  `,
})
export default class Nav {
  public links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];
}
