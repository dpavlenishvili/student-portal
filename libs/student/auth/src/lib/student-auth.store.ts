import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAuthUser } from '@portal/shared';

@Injectable({ providedIn: 'root' })
export class StudentAuthStore {
  private readonly _router = inject(Router);
  private readonly _user = signal<StudentAuthUser | null>(this._loadSaved());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly fullName = computed(() => this._user()?.fullName ?? '');
  readonly personalId = computed(() => this._user()?.personalId ?? '');
  readonly userId = computed(() => this._user()?.id ?? '');

  setUser(user: StudentAuthUser): void {
    this._user.set(user);
    localStorage.setItem('portal_student_user', JSON.stringify(user));
  }

  clearSession(): void {
    this._user.set(null);
    localStorage.removeItem('portal_student_user');
    this._router.navigate(['/login']);
  }

  private _loadSaved(): StudentAuthUser | null {
    try {
      const s = localStorage.getItem('portal_student_user');
      return s ? (JSON.parse(s) as StudentAuthUser) : null;
    } catch {
      return null;
    }
  }
}
