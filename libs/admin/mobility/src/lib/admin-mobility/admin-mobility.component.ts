import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService } from '@portal/shared';
import { MobilityApplication } from '@portal/shared';

type TabKey = 'all' | 'pending' | 'approved' | 'rejected';

@Component({
  selector: 'portal-admin-mobility',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-mobility.component.html',
  styleUrl: './admin-mobility.component.css',
})
export class AdminMobilityComponent {
  protected readonly store = inject(MockStoreService);

  protected activeTab = signal<TabKey>('all');
  protected selectedApp = signal<MobilityApplication | null>(null);

  // Deadline form fields
  protected deadlineStartDate = signal(this.store.mobilityDeadline().startDate);
  protected deadlineEndDate = signal(this.store.mobilityDeadline().endDate);

  protected readonly tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'ყველა' },
    { key: 'pending', label: 'მოლოდინში' },
    { key: 'approved', label: 'დამტკიცებული' },
    { key: 'rejected', label: 'უარყოფილი' },
  ];

  protected readonly pendingApps = computed(() =>
    this.store.mobilityApplications().filter(a => a.status === 'submitted')
  );

  protected readonly approvedApps = computed(() =>
    this.store.mobilityApplications().filter(a => a.status === 'approved')
  );

  protected readonly rejectedApps = computed(() =>
    this.store.mobilityApplications().filter(a => a.status === 'rejected')
  );

  protected readonly filteredApps = computed(() => {
    const tab = this.activeTab();
    const apps = this.store.mobilityApplications();
    switch (tab) {
      case 'pending': return apps.filter(a => a.status === 'submitted');
      case 'approved': return apps.filter(a => a.status === 'approved');
      case 'rejected': return apps.filter(a => a.status === 'rejected');
      default: return apps;
    }
  });

  setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  approve(id: number): void {
    this.store.updateMobilityStatus(id, 'approved');
  }

  reject(id: number): void {
    this.store.updateMobilityStatus(id, 'rejected');
  }

  verifyPayment(id: number): void {
    this.store.verifyPayment(id);
  }

  openDetail(app: MobilityApplication): void {
    this.selectedApp.set(app);
  }

  closeDetail(): void {
    this.selectedApp.set(null);
  }

  toggleMobilityWindow(): void {
    const current = this.store.mobilityDeadline();
    this.store.updateMobilityDeadline({ ...current, isOpen: !current.isOpen });
  }

  saveDeadline(): void {
    this.store.updateMobilityDeadline({
      startDate: this.deadlineStartDate(),
      endDate: this.deadlineEndDate(),
      isOpen: this.store.mobilityDeadline().isOpen,
    });
  }
}
