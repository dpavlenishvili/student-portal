import { Route } from '@angular/router';

export const adminIssuesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-issues/admin-issues.component').then(m => m.AdminIssuesComponent),
  },
];
