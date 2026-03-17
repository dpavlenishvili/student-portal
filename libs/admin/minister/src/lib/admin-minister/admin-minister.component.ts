import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, MinisterQuestion } from '@portal/shared';

@Component({
  selector: 'portal-admin-minister',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-minister.component.html',
  styleUrl: './admin-minister.component.css',
})
export class AdminMinisterComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly selectedQuestion = signal<MinisterQuestion | null>(null);
  protected readonly answerText = signal('');
  protected readonly filter = signal<'all' | 'pending' | 'answered'>('all');

  protected readonly filteredQuestions = computed(() => {
    const f = this.filter();
    const qs = this.store.ministerQuestions();
    if (f === 'all') return qs;
    return qs.filter(q => q.status === f);
  });

  selectQuestion(q: MinisterQuestion): void {
    this.selectedQuestion.set(q);
    this.answerText.set(q.answer ?? '');
  }

  closeDetail(): void {
    this.selectedQuestion.set(null);
  }

  submitAnswer(): void {
    const q = this.selectedQuestion();
    if (!q || !this.answerText()) return;
    this.store.answerMinisterQuestion(q.id, this.answerText());
    this.closeDetail();
  }
}
