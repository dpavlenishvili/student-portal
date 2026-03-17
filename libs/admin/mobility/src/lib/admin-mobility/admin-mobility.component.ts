import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { MockStoreService } from '@portal/shared';

@Component({
  selector: 'portal-admin-mobility',
  standalone: true,
  imports: [DatePipe, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-mobility.component.html',
  styleUrl: './admin-mobility.component.css',
})
export class AdminMobilityComponent {
  protected readonly store = inject(MockStoreService);

  protected readonly pendingApps = computed(() =>
    this.store.mobilityApplications().filter(a => a.status === 'submitted')
  );

  protected readonly approvedApps = computed(() =>
    this.store.mobilityApplications().filter(a => a.status === 'approved')
  );

  approve(id: number): void {
    this.store.updateMobilityStatus(id, 'approved');
  }

  reject(id: number): void {
    this.store.updateMobilityStatus(id, 'rejected');
  }

  verifyPayment(id: number): void {
    this.store.verifyPayment(id);
  }
}
