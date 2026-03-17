import { Route } from '@angular/router';
import { studentGuestGuard } from './student-auth.guard';

export const studentAuthRoutes: Route[] = [
  {
    path: '',
    canActivate: [studentGuestGuard],
    loadComponent: () =>
      import('./login/student-login.component').then(m => m.StudentLoginComponent),
  },
];
