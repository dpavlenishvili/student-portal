import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService, MockStoreService } from '@portal/shared';
import { AdminAuthStore, AdminAuthService } from '@portal/admin/auth';

@Component({
  selector: 'portal-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly authStore = inject(AdminAuthStore);
  protected readonly authService = inject(AdminAuthService);
  protected readonly store = inject(MockStoreService);
  protected readonly sidebarCollapsed = signal(false);

  protected readonly pendingIssues = this.store.issues;
  protected readonly pendingQuestions = this.store.ministerQuestions;

  get pendingIssueCount(): number {
    return this.store.issues().filter(i => i.status === 'new').length;
  }

  get pendingQuestionCount(): number {
    return this.store.ministerQuestions().filter(q => q.status === 'pending').length;
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
