import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MockStoreService, User } from '@portal/shared';

@Component({
  selector: 'portal-admin-students',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.css',
})
export class AdminStudentsComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly searchTerm = signal('');
  protected readonly selectedStudent = signal<User | null>(null);

  protected readonly filteredStudents = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.store.allStudents().filter(s =>
      s.firstName.toLowerCase().includes(term) ||
      s.lastName.toLowerCase().includes(term) ||
      s.personalId.includes(term)
    );
  });

  protected readonly statusLabel = (status: string): string => {
    switch (status) {
      case 'active': return 'აქტიური';
      case 'suspended': return 'შეჩერებული';
      case 'terminated': return 'შეწყვეტილი';
      default: return status;
    }
  };

  protected readonly statusClass = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': return 'bg-yellow-100 text-yellow-700';
      case 'terminated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  selectStudent(student: User): void {
    this.selectedStudent.set(student);
  }

  closeDetail(): void {
    this.selectedStudent.set(null);
  }
}
