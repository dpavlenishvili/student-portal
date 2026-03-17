import { Route } from '@angular/router';

export const studentMobilityRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-mobility/student-mobility.component').then(m => m.StudentMobilityComponent),
  },
];
