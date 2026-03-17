import { Route } from '@angular/router';

export const adminMobilityRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-mobility/admin-mobility.component').then(m => m.AdminMobilityComponent),
  },
];
