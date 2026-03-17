import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, MobilityProgram } from '@portal/shared';
import { StudentAuthStore } from '@portal/student/auth';

@Component({
  selector: 'portal-student-mobility',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-mobility.component.html',
  styleUrl: './student-mobility.component.css',
})
export class StudentMobilityComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly authStore = inject(StudentAuthStore);
  protected readonly activeTab = signal<'search' | 'applications'>('search');
  protected searchTerm = '';

  protected readonly filteredPrograms = computed(() => {
    const term = this.searchTerm.toLowerCase();
    return this.store.mobilityPrograms().filter(p =>
      p.university.toLowerCase().includes(term) ||
      p.programName.toLowerCase().includes(term)
    );
  });

  protected readonly myApplications = computed(() =>
    this.store.mobilityApplications().filter(a => a.studentId === this.store.currentStudent().id)
  );

  protected checkEligibility(): { eligible: boolean; reason?: string } {
    const user = this.store.currentStudent();
    if (user.status === 'active') return { eligible: true };
    if (user.status === 'suspended') return { eligible: true };
    if (user.status === 'terminated') {
      if (!user.statusChangeDate) return { eligible: false, reason: 'სტატუსის შეცვლის თარიღი უცნობია.' };
      const termDate = new Date(user.statusChangeDate);
      const diffDays = Math.ceil(Math.abs(Date.now() - termDate.getTime()) / 86400000);
      return diffDays <= 365 ? { eligible: true } : { eligible: false, reason: 'სტატუსის შეწყვეტიდან გასულია 1 წელზე მეტი.' };
    }
    return { eligible: false, reason: 'უცნობი სტატუსი' };
  }

  protected apply(prog: MobilityProgram): void {
    const student = this.store.currentStudent();
    const priority = this.myApplications().length + 1;
    this.store.submitMobilityApplication({
      studentName: `${student.firstName} ${student.lastName}`,
      studentId: student.id,
      personalId: student.personalId,
      university: prog.university,
      programName: prog.programName,
      status: 'submitted',
      paymentStatus: 'pending',
      priority,
      date: new Date().toISOString().split('T')[0],
      programId: prog.id,
    });
    this.activeTab.set('applications');
  }
}
