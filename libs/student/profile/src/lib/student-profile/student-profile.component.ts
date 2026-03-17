import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MockStoreService, ThemeService } from '@portal/shared';
import { StudentAuthStore } from '@portal/student/auth';

@Component({
  selector: 'portal-student-profile',
  standalone: true,
  imports: [DatePipe],
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

  logout(): void {
    this.authStore.clearSession();
  }
}
