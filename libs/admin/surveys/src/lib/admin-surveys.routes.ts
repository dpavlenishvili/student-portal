import { Route } from '@angular/router';

export const adminSurveysRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-surveys/admin-surveys.component').then(m => m.AdminSurveysComponent),
  },
];
