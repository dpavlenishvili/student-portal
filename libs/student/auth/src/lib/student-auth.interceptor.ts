import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StudentAuthStore } from './student-auth.store';

export const studentAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(StudentAuthStore).user();
  if (!user) return next(req);
  return next(req.clone({
    setHeaders: { Authorization: `Bearer fake-token-${user.id}` }
  }));
};
