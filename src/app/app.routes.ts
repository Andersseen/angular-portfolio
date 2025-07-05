import { Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./portfolio/routes'),
  },
];
export default appRoutes;
