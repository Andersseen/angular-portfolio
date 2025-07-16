import { Routes } from '@angular/router';
import App from './app';

const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      { path: '', redirectTo: '/hero', pathMatch: 'full' },
      {
        path: 'hero',
        loadComponent: () => import('@/components/hero'),
      },
      {
        path: 'about',
        loadComponent: () => import('@/components/about'),
      },
      {
        path: 'projects',
        loadComponent: () => import('@/components/projects'),
      },
      {
        path: 'contact',
        loadComponent: () => import('@/components/stars'),
      },
    ],
  },
  { path: '**', redirectTo: '/hero', pathMatch: 'full' },
];
export default routes;
