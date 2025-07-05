import { Routes } from '@angular/router';
import App from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'hero',
        loadComponent: () => import('../components/hero'),
      },
      {
        path: 'about',
        loadComponent: () => import('../components/about'),
      },
      {
        path: 'projects',
        loadComponent: () => import('../components/projects'),
      },
      {
        path: 'contact',
        loadComponent: () => import('../components/contact'),
      },
    ],
  },
  { path: '**', redirectTo: '/hero', pathMatch: 'full' },
];
export default appRoutes;
