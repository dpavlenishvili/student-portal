import { Route } from '@angular/router';

export const adminMinisterRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-minister/admin-minister.component').then(m => m.AdminMinisterComponent),
  },
];
