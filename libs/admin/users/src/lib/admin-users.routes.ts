import { Route } from '@angular/router';

export const adminUsersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-users/admin-users.component').then(m => m.AdminUsersComponent),
  },
];
