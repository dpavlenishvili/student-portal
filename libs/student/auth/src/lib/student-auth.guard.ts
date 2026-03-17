import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudentAuthStore } from './student-auth.store';

export const studentAuthGuard: CanActivateFn = () => {
  const store = inject(StudentAuthStore);
  const router = inject(Router);
  return store.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

export const studentGuestGuard: CanActivateFn = () => {
  const store = inject(StudentAuthStore);
  const router = inject(Router);
  return !store.isAuthenticated() ? true : router.createUrlTree(['/dashboard']);
};
