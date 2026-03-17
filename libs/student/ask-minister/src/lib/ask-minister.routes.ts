import { Route } from '@angular/router';

export const servicesHubRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./services-hub/services-hub.component').then(m => m.ServicesHubComponent),
  },
];

export const askMinisterRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-ask-minister/student-ask-minister.component').then(m => m.StudentAskMinisterComponent),
  },
];
