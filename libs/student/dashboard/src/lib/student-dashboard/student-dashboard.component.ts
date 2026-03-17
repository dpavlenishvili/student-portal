import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockStoreService } from '@portal/shared';

@Component({
  selector: 'portal-student-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly activeSurveys = computed(() =>
    this.store.surveys().filter(s => s.status === 'active')
  );
  protected readonly activeStatusLabel = computed(() => {
    switch (this.store.currentStudent().status) {
      case 'active': return 'აქტიური';
      case 'suspended': return 'შეჩერებული';
      case 'terminated': return 'შეწყვეტილი';
      default: return '';
    }
  });
}
