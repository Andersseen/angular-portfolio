import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { PagesComponent } from './pages';

const portfolioRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'hero',
        component: HeroComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

export default portfolioRoutes;
