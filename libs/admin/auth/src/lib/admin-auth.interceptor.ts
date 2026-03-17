import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminAuthStore } from './admin-auth.store';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(AdminAuthStore).user();
  if (!user) return next(req);
  return next(req.clone({
    setHeaders: { Authorization: `Bearer admin-token-${user.id}` }
  }));
};
