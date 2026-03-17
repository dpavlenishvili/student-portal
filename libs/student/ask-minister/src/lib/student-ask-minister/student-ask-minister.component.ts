import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MockStoreService } from '@portal/shared';

@Component({
  selector: 'portal-ask-minister',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-ask-minister.component.html',
  styleUrl: './student-ask-minister.component.css',
})
export class StudentAskMinisterComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly subject = signal('');
  protected readonly body = signal('');

  protected readonly myQuestions = () =>
    this.store.ministerQuestions().filter(
      q => q.studentName === `${this.store.currentStudent().firstName} ${this.store.currentStudent().lastName}`
    );

  send(): void {
    if (this.subject() && this.body()) {
      const student = this.store.currentStudent();
      this.store.addMinisterQuestion(
        this.subject(),
        this.body(),
        `${student.firstName} ${student.lastName}`,
        student.personalId
      );
      this.subject.set('');
      this.body.set('');
    }
  }
}
