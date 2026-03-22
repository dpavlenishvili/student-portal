import { Injectable, signal, computed } from '@angular/core';
import {
  MOCK_STUDENTS, MOCK_MOBILITY_PROGRAMS, MOCK_MOBILITY_APPLICATIONS,
  MOCK_SURVEYS, MOCK_MINISTER_QUESTIONS, MOCK_ISSUES, MOCK_OFFERS,
  MOCK_CURRENT_STUDENT, MOCK_NOTIFICATIONS, MOCK_ADMIN_USERS, MOCK_MOBILITY_DEADLINE
} from './mock-data';
import {
  User, MobilityApplication, MinisterQuestion, Survey, IssueReport,
  MobilityProgram, Notification, AdminUser, MobilityDeadline, SurveyQuestion
} from './models';

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
  readonly notifications = signal<Notification[]>(MOCK_NOTIFICATIONS);
  readonly adminUsers = signal<AdminUser[]>(MOCK_ADMIN_USERS);
  readonly mobilityDeadline = signal<MobilityDeadline>(MOCK_MOBILITY_DEADLINE);

  readonly unreadNotificationsCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  toggleMobilityWindow(): void { this.mobilityWindowOpen.update(v => !v); }

  // --- Minister Questions ---
  addMinisterQuestion(subject: string, body: string, studentName: string, personalId: string): void {
    const q: MinisterQuestion = {
      id: Date.now(), studentName, personalId, subject, body,
      status: 'pending', date: new Date().toISOString().split('T')[0]
    };
    this.ministerQuestions.update(qs => [q, ...qs]);
    this.addNotification('minister', 'შეკითხვა გაგზავნილია', `თქვენი შეკითხვა "${subject}" წარმატებით გაიგზავნა.`, '/services/minister');
  }

  answerMinisterQuestion(id: number, answer: string): void {
    const question = this.ministerQuestions().find(q => q.id === id);
    this.ministerQuestions.update(qs => qs.map(q =>
      q.id === id ? { ...q, status: 'answered' as const, answer, answeredAt: new Date().toISOString().split('T')[0] } : q
    ));
    if (question) {
      this.addNotification('minister', 'პასუხი მიღებულია', `თქვენს შეკითხვაზე "${question.subject}" პასუხი მიღებულია.`, '/services/minister');
    }
  }

  // --- Issues ---
  addIssue(studentName: string, personalId: string, studentId: string, category: string, description: string, photoUrl?: string): void {
    const issue: IssueReport = {
      id: Date.now(), studentName, personalId, studentId,
      category, description, status: 'new',
      date: new Date().toISOString().split('T')[0],
      ...(photoUrl ? { photoUrl } : {})
    };
    this.issues.update(is => [issue, ...is]);
  }

  updateIssueStatus(id: number, status: IssueReport['status'], feedback?: string): void {
    this.issues.update(is => is.map(i =>
      i.id === id ? { ...i, status, ...(feedback !== undefined ? { adminFeedback: feedback } : {}) } : i
    ));
    const issue = this.issues().find(i => i.id === id);
    if (issue) {
      const statusLabels: Record<string, string> = { 'new': 'ახალი', 'review': 'განხილვაშია', 'resolved': 'გადაწყვეტილია' };
      this.addNotification('issue', 'სტატუსი განახლდა', `თქვენი შეტყობინების სტატუსი შეიცვალა: ${statusLabels[status] || status}`, '/services/issues');
    }
  }

  // --- Mobility ---
  submitMobilityApplication(app: Omit<MobilityApplication, 'id'>): void {
    this.mobilityApplications.update(as => [{ ...app, id: Date.now() }, ...as]);
    this.addNotification('mobility', 'განაცხადი გაგზავნილია', `მობილობის განაცხადი წარმატებით გაიგზავნა.`, '/mobility');
  }

  updateMobilityApplication(id: number, updates: Partial<MobilityApplication>): void {
    this.mobilityApplications.update(as => as.map(a =>
      a.id === id ? { ...a, ...updates } : a
    ));
  }

  deleteMobilityApplication(id: number): void {
    this.mobilityApplications.update(as => as.filter(a => a.id !== id));
  }

  updateMobilityStatus(id: number, status: MobilityApplication['status']): void {
    this.mobilityApplications.update(as => as.map(a => a.id === id ? { ...a, status } : a));
    const app = this.mobilityApplications().find(a => a.id === id);
    if (app) {
      const statusLabels: Record<string, string> = { 'submitted': 'გაგზავნილია', 'approved': 'დადასტურებულია', 'rejected': 'უარყოფილია' };
      this.addNotification('mobility', 'მობილობის სტატუსი', `თქვენი მობილობის განაცხადის სტატუსი: ${statusLabels[status] || status}`, '/mobility');
    }
  }

  verifyPayment(id: number): void {
    this.mobilityApplications.update(as => as.map(a =>
      a.id === id ? { ...a, paymentStatus: 'paid' as const } : a
    ));
  }

  updateMobilityDeadline(deadline: MobilityDeadline): void {
    this.mobilityDeadline.set(deadline);
  }

  // --- Surveys ---
  submitSurveyResponse(surveyId: number, responses: Map<number, string | string[]>): void {
    this.surveys.update(ss => ss.map(s => {
      if (s.id !== surveyId) return s;
      const updatedQuestions = s.questions.map(q => {
        const response = responses.get(q.id);
        if (!response) return q;
        if (q.type === 'text') {
          return { ...q, textResponses: [...(q.textResponses || []), response as string] };
        }
        if (q.type === 'radio') {
          const optionIndex = q.options?.indexOf(response as string) ?? -1;
          if (optionIndex === -1) return q;
          const newResponses = [...(q.responses || q.options!.map(() => 0))];
          newResponses[optionIndex]++;
          return { ...q, responses: newResponses };
        }
        if (q.type === 'checkbox') {
          const selected = response as string[];
          const newResponses = [...(q.responses || q.options!.map(() => 0))];
          selected.forEach(opt => {
            const idx = q.options?.indexOf(opt) ?? -1;
            if (idx !== -1) newResponses[idx]++;
          });
          return { ...q, responses: newResponses };
        }
        return q;
      });
      return { ...s, questions: updatedQuestions, completedByCurrentUser: true, responsesCount: s.responsesCount + 1 };
    }));
  }

  completeSurvey(id: number): void {
    this.surveys.update(ss => ss.map(s =>
      s.id === id ? { ...s, completedByCurrentUser: true, responsesCount: s.responsesCount + 1 } : s
    ));
  }

  createSurvey(survey: Omit<Survey, 'id' | 'responsesCount'>): void {
    this.surveys.update(ss => [{ ...survey, id: Date.now(), responsesCount: 0 }, ...ss]);
  }

  updateSurvey(id: number, updates: Partial<Survey>): void {
    this.surveys.update(ss => ss.map(s =>
      s.id === id ? { ...s, ...updates } : s
    ));
  }

  publishSurvey(id: number): void {
    this.surveys.update(ss => ss.map(s =>
      s.id === id ? { ...s, status: 'active' as const } : s
    ));
    const survey = this.surveys().find(s => s.id === id);
    if (survey) {
      this.addNotification('survey', 'ახალი კითხვარი', `ახალი კითხვარი "${survey.title}" ხელმისაწვდომია შესავსებად.`, '/services/surveys');
    }
  }

  deleteSurvey(id: number): void {
    this.surveys.update(ss => ss.filter(s => s.id !== id));
  }

  // --- Notifications ---
  markNotificationRead(id: number): void {
    this.notifications.update(ns => ns.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  }

  markAllNotificationsRead(): void {
    this.notifications.update(ns => ns.map(n => ({ ...n, read: true })));
  }

  private addNotification(type: Notification['type'], title: string, message: string, link?: string): void {
    const notification: Notification = {
      id: Date.now() + Math.random(),
      type, title, message, link,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    this.notifications.update(ns => [notification, ...ns]);
  }

  // --- Admin Users ---
  addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt'>): void {
    const newUser: AdminUser = {
      ...user,
      id: 'admin-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.adminUsers.update(us => [newUser, ...us]);
  }

  updateAdminUser(id: string, updates: Partial<AdminUser>): void {
    this.adminUsers.update(us => us.map(u =>
      u.id === id ? { ...u, ...updates } : u
    ));
  }

  deleteAdminUser(id: string): void {
    this.adminUsers.update(us => us.filter(u => u.id !== id));
  }
}
