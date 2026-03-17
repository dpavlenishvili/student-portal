import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, Survey, SurveyQuestion } from '@portal/shared';

@Component({
  selector: 'portal-admin-surveys',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-surveys.component.html',
  styleUrl: './admin-surveys.component.css',
})
export class AdminSurveysComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly selectedSurvey = signal<Survey | null>(null);
  protected readonly showCreate = signal(false);
  protected readonly newTitle = signal('');
  protected readonly newDesc = signal('');

  protected readonly activeSurveys = computed(() => this.store.surveys().filter(s => s.status === 'active'));
  protected readonly completedSurveys = computed(() => this.store.surveys().filter(s => s.status === 'completed'));

  selectSurvey(survey: Survey): void {
    this.selectedSurvey.set(survey);
  }

  closeDetail(): void {
    this.selectedSurvey.set(null);
  }

  getResponsePercent(q: SurveyQuestion, index: number): number {
    if (!q.responses) return 0;
    const total = q.responses.reduce((a, b) => a + b, 0) || 1;
    return (q.responses[index] / total) * 100;
  }

  getResponse(q: SurveyQuestion, index: number): number {
    return q.responses?.[index] ?? 0;
  }

  submitCreate(): void {
    if (!this.newTitle() || !this.newDesc()) return;
    this.store.createSurvey({
      title: this.newTitle(),
      description: this.newDesc(),
      status: 'active',
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      target: 'global',
      questions: [],
      durationDays: 30,
    });
    this.newTitle.set('');
    this.newDesc.set('');
    this.showCreate.set(false);
  }
}
