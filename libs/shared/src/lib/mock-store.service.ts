import { Injectable, signal, computed } from '@angular/core';
import {
  MOCK_STUDENTS, MOCK_MOBILITY_PROGRAMS, MOCK_MOBILITY_APPLICATIONS,
  MOCK_SURVEYS, MOCK_MINISTER_QUESTIONS, MOCK_ISSUES, MOCK_OFFERS, MOCK_CURRENT_STUDENT
} from './mock-data';
import { User, MobilityApplication, MinisterQuestion, Survey, IssueReport, MobilityProgram } from './models';

@Injectable({ providedIn: 'root' })
export class MockStoreService {
  readonly mobilityWindowOpen = signal(true);
  readonly currentStudent = signal<User>(MOCK_CURRENT_STUDENT);
  readonly allStudents = signal<User[]>(MOCK_STUDENTS);
  readonly mobilityPrograms = signal<MobilityProgram[]>(MOCK_MOBILITY_PROGRAMS);
  readonly mobilityApplications = signal<MobilityApplication[]>(MOCK_MOBILITY_APPLICATIONS);
  readonly surveys = signal<Survey[]>(MOCK_SURVEYS);
  readonly ministerQuestions = signal<MinisterQuestion[]>(MOCK_MINISTER_QUESTIONS);
  readonly issues = signal<IssueReport[]>(MOCK_ISSUES);
  readonly offers = signal(MOCK_OFFERS);

  toggleMobilityWindow(): void { this.mobilityWindowOpen.update(v => !v); }

  addMinisterQuestion(subject: string, body: string, studentName: string, personalId: string): void {
    const q: MinisterQuestion = {
      id: Date.now(), studentName, personalId, subject, body,
      status: 'pending', date: new Date().toISOString().split('T')[0]
    };
    this.ministerQuestions.update(qs => [q, ...qs]);
  }

  answerMinisterQuestion(id: number, answer: string): void {
    this.ministerQuestions.update(qs => qs.map(q =>
      q.id === id ? { ...q, status: 'answered' as const, answer, answeredAt: new Date().toISOString().split('T')[0] } : q
    ));
  }

  addIssue(studentName: string, personalId: string, studentId: string, category: string, description: string): void {
    const issue: IssueReport = {
      id: Date.now(), studentName, personalId, studentId,
      category, description, status: 'new',
      date: new Date().toISOString().split('T')[0]
    };
    this.issues.update(is => [issue, ...is]);
  }

  updateIssueStatus(id: number, status: IssueReport['status'], feedback?: string): void {
    this.issues.update(is => is.map(i =>
      i.id === id ? { ...i, status, ...(feedback !== undefined ? { adminFeedback: feedback } : {}) } : i
    ));
  }

  submitMobilityApplication(app: Omit<MobilityApplication, 'id'>): void {
    this.mobilityApplications.update(as => [{ ...app, id: Date.now() }, ...as]);
  }

  updateMobilityStatus(id: number, status: MobilityApplication['status']): void {
    this.mobilityApplications.update(as => as.map(a => a.id === id ? { ...a, status } : a));
  }

  verifyPayment(id: number): void {
    this.mobilityApplications.update(as => as.map(a =>
      a.id === id ? { ...a, paymentStatus: 'paid' as const } : a
    ));
  }

  completeSurvey(id: number): void {
    this.surveys.update(ss => ss.map(s =>
      s.id === id ? { ...s, completedByCurrentUser: true, responsesCount: s.responsesCount + 1 } : s
    ));
  }

  createSurvey(survey: Omit<Survey, 'id' | 'responsesCount'>): void {
    this.surveys.update(ss => [{ ...survey, id: Date.now(), responsesCount: 0 }, ...ss]);
  }
}
