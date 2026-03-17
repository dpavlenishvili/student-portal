import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, IssueReport } from '@portal/shared';

@Component({
  selector: 'portal-admin-issues',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-issues.component.html',
  styleUrl: './admin-issues.component.css',
})
export class AdminIssuesComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly selectedIssue = signal<IssueReport | null>(null);
  protected readonly feedback = signal('');

  protected readonly statusLabel = (status: string): string => {
    switch (status) {
      case 'new': return 'ახალი';
      case 'review': return 'განხილვაში';
      case 'resolved': return 'გადაწყვეტილი';
      default: return status;
    }
  };

  protected readonly statusClass = (status: string): string => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  selectIssue(issue: IssueReport): void {
    this.selectedIssue.set(issue);
    this.feedback.set(issue.adminFeedback ?? '');
  }

  closeDetail(): void {
    this.selectedIssue.set(null);
  }

  updateStatus(status: 'new' | 'review' | 'resolved'): void {
    const issue = this.selectedIssue();
    if (!issue) return;
    this.store.updateIssueStatus(issue.id, status, this.feedback());
    this.closeDetail();
  }
}
