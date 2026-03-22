import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockStoreService, ThemeService } from '@portal/shared';
import { StudentAuthStore } from '@portal/student/auth';

@Component({
  selector: 'portal-student-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly theme = inject(ThemeService);
  protected readonly authStore = inject(StudentAuthStore);

  protected readonly statusLabel = computed(() => {
    switch (this.store.currentStudent().status) {
      case 'active': return 'აქტიური';
      case 'suspended': return 'შეჩერებული';
      case 'terminated': return 'შეწყვეტილი';
      default: return '';
    }
  });

  protected readonly statusColor = computed(() => {
    switch (this.store.currentStudent().status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  });

  protected readonly services = [
    { label: 'კითხვარები', icon: 'fa-solid fa-clipboard-list', route: '/services/surveys', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { label: 'შეკითხვა მინისტრს', icon: 'fa-solid fa-envelope', route: '/services/minister', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
    { label: 'შეფასება', icon: 'fa-solid fa-flag', route: '/services/issues', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
    { label: 'მობილობა', icon: 'fa-solid fa-plane', route: '/mobility', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  ];

  protected readonly offers = computed(() => this.store.offers());

  logout(): void {
    this.authStore.clearSession();
  }
}
