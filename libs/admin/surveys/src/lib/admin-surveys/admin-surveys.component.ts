import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, Survey, SurveyQuestion, QuestionType, SurveyTarget } from '@portal/shared';

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
  protected readonly editingSurvey = signal<Survey | null>(null);

  // Form fields
  protected readonly newTitle = signal('');
  protected readonly newDesc = signal('');
  protected readonly newDueDate = signal('');
  protected readonly newTarget = signal<SurveyTarget>('global');
  protected readonly newTargetUniversity = signal('');
  protected readonly newTargetFaculty = signal('');
  protected readonly newQuestions = signal<SurveyQuestion[]>([]);
  protected readonly newQuestionType = signal<QuestionType>('radio');

  // Filter bar for analytics
  protected readonly filterUniversity = signal('');
  protected readonly filterFaculty = signal('');
  protected readonly filterDateFrom = signal('');
  protected readonly filterDateTo = signal('');

  // University and faculty lists from student data
  protected readonly universities = computed(() => {
    const students = this.store.allStudents();
    return [...new Set(students.map(s => s.university))];
  });

  protected readonly faculties = computed(() => {
    const students = this.store.allStudents();
    const uni = this.newTarget() === 'faculty' ? this.newTargetUniversity() : '';
    if (!uni) return [...new Set(students.map(s => s.faculty))];
    return [...new Set(students.filter(s => s.university === uni).map(s => s.faculty))];
  });

  protected readonly filterFaculties = computed(() => {
    const students = this.store.allStudents();
    const uni = this.filterUniversity();
    if (!uni) return [...new Set(students.map(s => s.faculty))];
    return [...new Set(students.filter(s => s.university === uni).map(s => s.faculty))];
  });

  protected readonly draftSurveys = computed(() => this.store.surveys().filter(s => s.status === 'draft'));
  protected readonly activeSurveys = computed(() => this.store.surveys().filter(s => s.status === 'active'));
  protected readonly completedSurveys = computed(() => this.store.surveys().filter(s => s.status === 'completed'));

  protected readonly filteredSurveys = computed(() => {
    let surveys = this.store.surveys();
    const uni = this.filterUniversity();
    const fac = this.filterFaculty();
    const dateFrom = this.filterDateFrom();
    const dateTo = this.filterDateTo();

    if (uni) {
      surveys = surveys.filter(s => s.target === 'global' || s.targetUniversity === uni);
    }
    if (fac) {
      surveys = surveys.filter(s => s.target === 'global' || s.targetFaculty === fac);
    }
    if (dateFrom) {
      surveys = surveys.filter(s => s.dueDate >= dateFrom);
    }
    if (dateTo) {
      surveys = surveys.filter(s => s.dueDate <= dateTo);
    }
    return surveys;
  });

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

  // --- Create / Edit modal ---
  openCreate(): void {
    this.editingSurvey.set(null);
    this.newTitle.set('');
    this.newDesc.set('');
    this.newDueDate.set(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    this.newTarget.set('global');
    this.newTargetUniversity.set('');
    this.newTargetFaculty.set('');
    this.newQuestions.set([]);
    this.showCreate.set(true);
  }

  openEdit(survey: Survey): void {
    if (survey.status !== 'draft') return;
    this.editingSurvey.set(survey);
    this.newTitle.set(survey.title);
    this.newDesc.set(survey.description);
    this.newDueDate.set(survey.dueDate);
    this.newTarget.set(survey.target);
    this.newTargetUniversity.set(survey.targetUniversity ?? '');
    this.newTargetFaculty.set(survey.targetFaculty ?? '');
    this.newQuestions.set(survey.questions.map(q => ({ ...q, options: q.options ? [...q.options] : undefined })));
    this.showCreate.set(true);
  }

  closeCreate(): void {
    this.showCreate.set(false);
    this.editingSurvey.set(null);
  }

  // --- Question management ---
  addQuestion(): void {
    const type = this.newQuestionType();
    const question: SurveyQuestion = {
      id: Date.now() + Math.random(),
      type,
      text: '',
      required: false,
      ...(type !== 'text' ? { options: [''] } : {}),
    };
    this.newQuestions.update(qs => [...qs, question]);
  }

  removeQuestion(index: number): void {
    this.newQuestions.update(qs => qs.filter((_, i) => i !== index));
  }

  updateQuestionText(index: number, text: string): void {
    this.newQuestions.update(qs => qs.map((q, i) => i === index ? { ...q, text } : q));
  }

  updateQuestionType(index: number, type: QuestionType): void {
    this.newQuestions.update(qs => qs.map((q, i) => {
      if (i !== index) return q;
      if (type === 'text') {
        const { options, ...rest } = q;
        return { ...rest, type };
      }
      return { ...q, type, options: q.options ?? [''] };
    }));
  }

  toggleRequired(index: number): void {
    this.newQuestions.update(qs => qs.map((q, i) => i === index ? { ...q, required: !q.required } : q));
  }

  addOption(qIndex: number): void {
    this.newQuestions.update(qs => qs.map((q, i) =>
      i === qIndex ? { ...q, options: [...(q.options ?? []), ''] } : q
    ));
  }

  removeOption(qIndex: number, optIndex: number): void {
    this.newQuestions.update(qs => qs.map((q, i) =>
      i === qIndex ? { ...q, options: (q.options ?? []).filter((_, oi) => oi !== optIndex) } : q
    ));
  }

  updateOption(qIndex: number, optIndex: number, value: string): void {
    this.newQuestions.update(qs => qs.map((q, i) =>
      i === qIndex ? { ...q, options: (q.options ?? []).map((o, oi) => oi === optIndex ? value : o) } : q
    ));
  }

  moveQuestion(index: number, direction: 'up' | 'down'): void {
    const qs = [...this.newQuestions()];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= qs.length) return;
    [qs[index], qs[targetIndex]] = [qs[targetIndex], qs[index]];
    this.newQuestions.set(qs);
  }

  // --- Save / Publish ---
  saveDraft(): void {
    if (!this.newTitle() || !this.newDesc()) return;
    const surveyData = this.buildSurveyData('draft');
    const editing = this.editingSurvey();
    if (editing) {
      this.store.updateSurvey(editing.id, surveyData);
    } else {
      this.store.createSurvey(surveyData as Omit<Survey, 'id' | 'responsesCount'>);
    }
    this.closeCreate();
  }

  publishFromModal(): void {
    if (!this.newTitle() || !this.newDesc()) return;
    const editing = this.editingSurvey();
    if (editing) {
      this.store.updateSurvey(editing.id, this.buildSurveyData('draft'));
      this.store.publishSurvey(editing.id);
    } else {
      const surveyData = this.buildSurveyData('draft');
      this.store.createSurvey(surveyData as Omit<Survey, 'id' | 'responsesCount'>);
      // Find the just-created survey and publish it
      const created = this.store.surveys()[0];
      if (created) {
        this.store.publishSurvey(created.id);
      }
    }
    this.closeCreate();
  }

  publishSurvey(survey: Survey): void {
    this.store.publishSurvey(survey.id);
  }

  deleteSurvey(survey: Survey): void {
    if (survey.status !== 'draft') return;
    this.store.deleteSurvey(survey.id);
  }

  private buildSurveyData(status: 'draft' | 'active'): Partial<Survey> {
    return {
      title: this.newTitle(),
      description: this.newDesc(),
      status,
      dueDate: this.newDueDate() || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      target: this.newTarget(),
      ...(this.newTarget() !== 'global' ? { targetUniversity: this.newTargetUniversity() } : {}),
      ...(this.newTarget() === 'faculty' ? { targetFaculty: this.newTargetFaculty() } : {}),
      questions: this.newQuestions(),
      durationDays: 30,
    };
  }

  getQuestionTypeLabel(type: QuestionType): string {
    const labels: Record<QuestionType, string> = {
      radio: 'ერთი არჩევანი',
      checkbox: 'მრავალი არჩევანი',
      text: 'ტექსტური',
    };
    return labels[type];
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      draft: 'დრაფტი',
      active: 'აქტიური',
      completed: 'დასრულებული',
    };
    return labels[status] ?? status;
  }

  getStatusClasses(status: string): string {
    const classes: Record<string, string> = {
      draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };
    return classes[status] ?? '';
  }

  getTargetLabel(survey: Survey): string {
    if (survey.target === 'global') return 'გლობალური';
    if (survey.target === 'faculty') return survey.targetFaculty ?? survey.targetUniversity ?? 'ფაკულტეტი';
    return survey.targetUniversity ?? 'უნივერსიტეტი';
  }

  clearFilters(): void {
    this.filterUniversity.set('');
    this.filterFaculty.set('');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
  }

  hasActiveFilters(): boolean {
    return !!(this.filterUniversity() || this.filterFaculty() || this.filterDateFrom() || this.filterDateTo());
  }
}
