import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockStoreService, IssueReport } from '@portal/shared';

@Component({
  selector: 'portal-issue-report',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-issue-report.component.html',
  styleUrl: './student-issue-report.component.css',
})
export class StudentIssueReportComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly category = signal('ინფრასტრუქტურა');
  protected readonly desc = signal('');
  protected readonly submitted = signal(false);
  protected readonly activeTab = signal<'new' | 'history'>('new');
  protected readonly photoPreview = signal<string | null>(null);
  protected readonly expandedIssueId = signal<number | null>(null);

  protected readonly myIssues = computed(() => {
    const studentId = this.store.currentStudent().id;
    return this.store.issues().filter(i => i.studentId === studentId);
  });

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removePhoto(): void {
    this.photoPreview.set(null);
  }

  toggleExpand(id: number): void {
    this.expandedIssueId.update(current => current === id ? null : id);
  }

  statusLabel(status: IssueReport['status']): string {
    const labels: Record<string, string> = {
      'new': 'ახალი',
      'review': 'განხილვაშია',
      'resolved': 'გადაწყვეტილია'
    };
    return labels[status] || status;
  }

  statusClasses(status: IssueReport['status']): string {
    const classes: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'resolved': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    };
    return classes[status] || '';
  }

  send(): void {
    if (this.category() && this.desc()) {
      const student = this.store.currentStudent();
      this.store.addIssue(
        `${student.firstName} ${student.lastName}`,
        student.personalId,
        student.id,
        this.category(),
        this.desc(),
        this.photoPreview() || undefined
      );
      this.desc.set('');
      this.photoPreview.set(null);
      this.submitted.set(true);
      setTimeout(() => this.submitted.set(false), 3000);
    }
  }
}
