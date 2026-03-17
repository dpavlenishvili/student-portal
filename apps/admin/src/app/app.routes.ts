import { Routes } from '@angular/router';
import { adminAuthGuard, adminAuthRoutes } from '@portal/admin/auth';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => Promise.resolve(adminAuthRoutes),
  },
  {
    path: '',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@portal/admin/dashboard').then(m => m.adminDashboardRoutes),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('@portal/admin/students').then(m => m.adminStudentsRoutes),
      },
      {
        path: 'mobility',
        loadChildren: () =>
          import('@portal/admin/mobility').then(m => m.adminMobilityRoutes),
      },
      {
        path: 'surveys',
        loadChildren: () =>
          import('@portal/admin/surveys').then(m => m.adminSurveysRoutes),
      },
      {
        path: 'issues',
        loadChildren: () =>
          import('@portal/admin/issues').then(m => m.adminIssuesRoutes),
      },
      {
        path: 'minister',
        loadChildren: () =>
          import('@portal/admin/minister').then(m => m.adminMinisterRoutes),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
