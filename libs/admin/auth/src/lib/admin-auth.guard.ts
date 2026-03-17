import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthStore } from './admin-auth.store';

export const adminAuthGuard: CanActivateFn = () => {
  const store = inject(AdminAuthStore);
  const router = inject(Router);
  return store.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

export const adminGuestGuard: CanActivateFn = () => {
  const store = inject(AdminAuthStore);
  const router = inject(Router);
  return !store.isAuthenticated() ? true : router.createUrlTree(['/dashboard']);
};
