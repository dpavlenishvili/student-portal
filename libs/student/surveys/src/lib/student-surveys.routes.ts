import { Route } from '@angular/router';

export const studentSurveysRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-surveys/student-surveys.component').then(m => m.StudentSurveysComponent),
  },
];
