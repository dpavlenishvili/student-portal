import { Route } from '@angular/router';
import { adminGuestGuard } from './admin-auth.guard';

export const adminAuthRoutes: Route[] = [
  {
    path: '',
    canActivate: [adminGuestGuard],
    loadComponent: () =>
      import('./login/admin-login.component').then(m => m.AdminLoginComponent),
  },
];
