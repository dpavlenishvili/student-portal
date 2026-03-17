import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'portal-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private readonly _auth = inject(AdminAuthService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly showPassword = signal(false);

  readonly form = this._fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { username, password } = this.form.getRawValue();
    this._auth.loginAndStore(username!, password!).subscribe({
      next: () => this._router.navigate(['/dashboard']),
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('მომხმარებლის სახელი ან პაროლი არასწორია');
      },
    });
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
