import { Routes } from '@angular/router';
import { studentAuthGuard, studentAuthRoutes } from '@portal/student/auth';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => Promise.resolve(studentAuthRoutes),
  },
  {
    path: '',
    canActivate: [studentAuthGuard],
    loadComponent: () =>
      import('./layout/student-layout.component').then(m => m.StudentLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@portal/student/dashboard').then(m => m.studentDashboardRoutes),
      },
      {
        path: 'mobility',
        loadChildren: () =>
          import('@portal/student/mobility').then(m => m.studentMobilityRoutes),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@portal/student/profile').then(m => m.studentProfileRoutes),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('@portal/student/ask-minister').then(m => m.servicesHubRoutes),
      },
      {
        path: 'services/minister',
        loadChildren: () =>
          import('@portal/student/ask-minister').then(m => m.askMinisterRoutes),
      },
      {
        path: 'services/surveys',
        loadChildren: () =>
          import('@portal/student/surveys').then(m => m.studentSurveysRoutes),
      },
      {
        path: 'services/issues',
        loadChildren: () =>
          import('@portal/student/issue-report').then(m => m.issueReportRoutes),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
