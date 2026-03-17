import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAuthStore } from './admin-auth.store';

const VALID_ADMIN_CREDENTIALS = [
  { username: 'admin', password: 'admin123' },
  { username: 'moderator', password: 'admin123' },
];

const ADMIN_USER = {
  id: 'a001',
  role: 'admin' as const,
  username: 'admin',
  permissions: ['students', 'mobility', 'surveys', 'issues', 'minister', 'settings'],
};

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly _store = inject(AdminAuthStore);

  loginAndStore(username: string, password: string): Observable<boolean> {
    return new Observable(obs => {
      setTimeout(() => {
        const match = VALID_ADMIN_CREDENTIALS.find(
          c => c.username === username && c.password === password
        );
        if (!match) {
          obs.error(new Error('invalid_credentials'));
          return;
        }
        this._store.setUser({ ...ADMIN_USER, username });
        obs.next(true);
        obs.complete();
      }, 700);
    });
  }

  logout(): void {
    this._store.clearSession();
  }
}
