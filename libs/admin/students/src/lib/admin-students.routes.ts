import { Route } from '@angular/router';

export const adminStudentsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-students/admin-students.component').then(m => m.AdminStudentsComponent),
  },
];
