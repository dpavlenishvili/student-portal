import { Route } from '@angular/router';

export const issueReportRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./student-issue-report/student-issue-report.component').then(m => m.StudentIssueReportComponent),
  },
];
