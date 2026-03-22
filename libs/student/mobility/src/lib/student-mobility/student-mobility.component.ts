import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockStoreService, MobilityApplication, MobilityProgram } from '@portal/shared';
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

  // Edit modal state
  protected readonly editingApplication = signal<MobilityApplication | null>(null);
  protected editPriority = 1;
  protected editProgramId = 0;

  // Delete confirmation state
  protected readonly deletingApplicationId = signal<number | null>(null);

  protected readonly deadline = computed(() => this.store.mobilityDeadline());

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

  protected openEditModal(app: MobilityApplication): void {
    this.editPriority = app.priority;
    this.editProgramId = app.programId;
    this.editingApplication.set(app);
  }

  protected closeEditModal(): void {
    this.editingApplication.set(null);
  }

  protected saveEdit(): void {
    const app = this.editingApplication();
    if (!app) return;

    const selectedProgram = this.store.mobilityPrograms().find(p => p.id === this.editProgramId);
    const updates: Partial<MobilityApplication> = {
      priority: this.editPriority,
    };
    if (selectedProgram) {
      updates.programId = selectedProgram.id;
      updates.programName = selectedProgram.programName;
      updates.university = selectedProgram.university;
    }

    this.store.updateMobilityApplication(app.id, updates);
    this.editingApplication.set(null);
  }

  protected confirmDelete(appId: number): void {
    this.deletingApplicationId.set(appId);
  }

  protected cancelDelete(): void {
    this.deletingApplicationId.set(null);
  }

  protected deleteApplication(): void {
    const id = this.deletingApplicationId();
    if (id !== null) {
      this.store.deleteMobilityApplication(id);
      this.deletingApplicationId.set(null);
    }
  }
}
