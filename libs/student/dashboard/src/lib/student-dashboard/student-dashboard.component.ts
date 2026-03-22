import { ChangeDetectionStrategy, Component, computed, inject, signal, ElementRef, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockStoreService, NotificationType } from '@portal/shared';

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
  private readonly elRef = inject(ElementRef);

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

  protected readonly notificationPanelOpen = signal(false);

  toggleNotificationPanel(): void {
    this.notificationPanelOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.notificationPanelOpen() && !this.elRef.nativeElement.querySelector('.notification-panel-container')?.contains(event.target as Node)) {
      this.notificationPanelOpen.set(false);
    }
  }

  markAsRead(id: number): void {
    this.store.markNotificationRead(id);
  }

  markAllAsRead(): void {
    this.store.markAllNotificationsRead();
  }

  notificationIcon(type: NotificationType): string {
    switch (type) {
      case 'survey': return 'fa-solid fa-clipboard-question';
      case 'issue': return 'fa-solid fa-circle-exclamation';
      case 'minister': return 'fa-solid fa-comment-dots';
      case 'mobility': return 'fa-solid fa-shuffle';
      case 'system': return 'fa-solid fa-gear';
    }
  }

  notificationIconBg(type: NotificationType): string {
    switch (type) {
      case 'survey': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400';
      case 'issue': return 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400';
      case 'minister': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
      case 'mobility': return 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400';
      case 'system': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
    }
  }
}
