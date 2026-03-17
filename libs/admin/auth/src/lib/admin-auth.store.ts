import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthUser } from '@portal/shared';

@Injectable({ providedIn: 'root' })
export class AdminAuthStore {
  private readonly _router = inject(Router);
  private readonly _user = signal<AdminAuthUser | null>(this._loadSaved());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly username = computed(() => this._user()?.username ?? '');
  readonly userId = computed(() => this._user()?.id ?? '');
  readonly hasPermission = (p: string) => computed(() => this._user()?.permissions.includes(p) ?? false);

  setUser(user: AdminAuthUser): void {
    this._user.set(user);
    sessionStorage.setItem('portal_admin_user', JSON.stringify(user));
  }

  clearSession(): void {
    this._user.set(null);
    sessionStorage.removeItem('portal_admin_user');
    this._router.navigate(['/login']);
  }

  private _loadSaved(): AdminAuthUser | null {
    try {
      const s = sessionStorage.getItem('portal_admin_user');
      return s ? (JSON.parse(s) as AdminAuthUser) : null;
    } catch {
      return null;
    }
  }
}
