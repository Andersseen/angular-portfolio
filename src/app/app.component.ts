import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcherComponent,
    LanguageSwitcherComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-screen bg-white transition-colors duration-300 dark:bg-neutral-900">
      <app-theme-switcher />
      <app-language-switcher />

      <main>
        <app-hero />
        <app-about />
        <app-skills />
        <app-projects />
        <app-contact />
      </main>

      <app-footer />
    </div>
  `,
})
export default class App {
  public name = 'Professional Angular Portfolio';
}
