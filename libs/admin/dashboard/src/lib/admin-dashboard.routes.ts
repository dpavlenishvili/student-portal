import { Route } from '@angular/router';

export const adminDashboardRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
  },
];
