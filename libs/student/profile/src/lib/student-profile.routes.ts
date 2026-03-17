import { Route } from '@angular/router';

export const studentProfileRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-profile/student-profile.component').then(m => m.StudentProfileComponent),
  },
];
