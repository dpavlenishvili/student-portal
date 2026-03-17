import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockStoreService } from '@portal/shared';

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

  send(): void {
    if (this.category() && this.desc()) {
      const student = this.store.currentStudent();
      this.store.addIssue(
        `${student.firstName} ${student.lastName}`,
        student.personalId,
        student.id,
        this.category(),
        this.desc()
      );
      this.desc.set('');
      this.submitted.set(true);
      setTimeout(() => this.submitted.set(false), 3000);
    }
  }
}
