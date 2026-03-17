import { Route } from '@angular/router';

export const studentDashboardRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
  },
];
