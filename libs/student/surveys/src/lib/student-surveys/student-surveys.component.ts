import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockStoreService, Survey, SurveyQuestion } from '@portal/shared';

@Component({
  selector: 'portal-student-surveys',
  standalone: true,
  imports: [RouterLink, NgClass, DatePipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-surveys.component.html',
  styleUrl: './student-surveys.component.css',
})
export class StudentSurveysComponent {
  protected readonly store = inject(MockStoreService);

  readonly expandedSurveyId = signal<number | null>(null);
  readonly responses = signal<Map<number, string | string[]>>(new Map());
  readonly submitted = signal(false);
  readonly validationErrors = signal<Set<number>>(new Set());

  readonly activeSurveys = computed(() =>
    this.store.surveys().filter(s => s.status === 'active' && !s.completedByCurrentUser)
  );

  readonly completedSurveys = computed(() =>
    this.store.surveys().filter(s => s.completedByCurrentUser || s.status === 'completed')
  );

  toggleSurvey(surveyId: number): void {
    if (this.expandedSurveyId() === surveyId) {
      this.expandedSurveyId.set(null);
    } else {
      this.expandedSurveyId.set(surveyId);
      this.responses.set(new Map());
      this.validationErrors.set(new Set());
      this.submitted.set(false);
    }
  }

  setRadioResponse(questionId: number, value: string): void {
    const map = new Map(this.responses());
    map.set(questionId, value);
    this.responses.set(map);
    this.clearValidationError(questionId);
  }

  setTextResponse(questionId: number, value: string): void {
    const map = new Map(this.responses());
    map.set(questionId, value);
    this.responses.set(map);
    if (value.trim()) {
      this.clearValidationError(questionId);
    }
  }

  toggleCheckboxResponse(questionId: number, option: string, checked: boolean): void {
    const map = new Map(this.responses());
    const current = (map.get(questionId) as string[]) || [];
    if (checked) {
      map.set(questionId, [...current, option]);
    } else {
      map.set(questionId, current.filter(o => o !== option));
    }
    this.responses.set(map);
    const updated = map.get(questionId) as string[];
    if (updated.length > 0) {
      this.clearValidationError(questionId);
    }
  }

  isCheckboxChecked(questionId: number, option: string): boolean {
    const current = this.responses().get(questionId) as string[] | undefined;
    return current?.includes(option) ?? false;
  }

  getRadioValue(questionId: number): string {
    return (this.responses().get(questionId) as string) || '';
  }

  getTextValue(questionId: number): string {
    return (this.responses().get(questionId) as string) || '';
  }

  hasError(questionId: number): boolean {
    return this.validationErrors().has(questionId);
  }

  submitSurvey(survey: Survey): void {
    const errors = new Set<number>();
    for (const q of survey.questions) {
      if (q.required !== false) {
        const response = this.responses().get(q.id);
        if (!response) {
          errors.add(q.id);
        } else if (typeof response === 'string' && !response.trim()) {
          errors.add(q.id);
        } else if (Array.isArray(response) && response.length === 0) {
          errors.add(q.id);
        }
      }
    }

    if (errors.size > 0) {
      this.validationErrors.set(errors);
      return;
    }

    this.store.submitSurveyResponse(survey.id, this.responses());
    this.submitted.set(true);
    this.expandedSurveyId.set(null);
    this.responses.set(new Map());
    this.validationErrors.set(new Set());
  }

  private clearValidationError(questionId: number): void {
    const errors = new Set(this.validationErrors());
    errors.delete(questionId);
    this.validationErrors.set(errors);
  }
}
