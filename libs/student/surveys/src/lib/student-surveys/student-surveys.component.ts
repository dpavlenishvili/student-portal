import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockStoreService } from '@portal/shared';

@Component({
  selector: 'portal-student-surveys',
  standalone: true,
  imports: [RouterLink, NgClass, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-surveys.component.html',
  styleUrl: './student-surveys.component.css',
})
export class StudentSurveysComponent {
  protected readonly store = inject(MockStoreService);

  complete(id: number): void {
    this.store.completeSurvey(id);
  }
}
