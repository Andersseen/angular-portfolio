import { Component } from '@angular/core';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { SkillsComponent } from '../components/skills/skills.component';

@Component({
  selector: 'app-pages',
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  template: `
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-contact />
    </main>
  `,
})
export default class Pages {}
