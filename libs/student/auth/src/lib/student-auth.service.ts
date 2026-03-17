import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAuthStore } from './student-auth.store';
import { MOCK_STUDENTS } from '@portal/shared';

const VALID_CREDENTIALS = [
  { username: 'student', password: 'student123', studentId: 's001' },
  { username: 'nino', password: 'student123', studentId: 's002' },
  { username: 'davit', password: 'student123', studentId: 's003' },
];

@Injectable({ providedIn: 'root' })
export class StudentAuthService {
  private readonly _store = inject(StudentAuthStore);

  loginAndStore(username: string, password: string): Observable<boolean> {
    return new Observable(obs => {
      setTimeout(() => {
        const match = VALID_CREDENTIALS.find(
          c => c.username === username && c.password === password
        );
        if (!match) {
          obs.error(new Error('invalid_credentials'));
          return;
        }
        const student = MOCK_STUDENTS.find(s => s.id === match.studentId);
        if (!student) {
          obs.error(new Error('student_not_found'));
          return;
        }
        this._store.setUser({
          id: student.id,
          role: 'student',
          personalId: student.personalId,
          fullName: `${student.firstName} ${student.lastName}`,
        });
        obs.next(true);
        obs.complete();
      }, 700);
    });
  }

  logout(): void {
    this._store.clearSession();
  }
}
