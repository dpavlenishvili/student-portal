export type UserStatus = 'active' | 'suspended' | 'terminated';
export type ApplicationStatus = 'submitted' | 'approved' | 'rejected';
export type PaymentStatus = 'pending' | 'paid';
export type IssueStatus = 'new' | 'review' | 'resolved';
export type QuestionStatus = 'pending' | 'answered';
export type SurveyStatus = 'draft' | 'active' | 'completed';
export type SurveyTarget = 'global' | 'university' | 'faculty';
export type QuestionType = 'radio' | 'checkbox' | 'text';
export type NotificationType = 'survey' | 'issue' | 'minister' | 'mobility' | 'system';
export type AdminRole = 'super_admin' | 'moderator' | 'analyst' | 'viewer';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  personalId: string;
  phone: string;
  birthDate: string;
  status: UserStatus;
  university: string;
  faculty: string;
  program: string;
  enrollmentDate: string;
  statusChangeDate?: string;
  gpa: number;
  credits: number;
  photoUrl: string;
  email: string;
}

export interface MobilityProgram {
  id: number;
  university: string;
  country: string;
  programName: string;
  vacancies: number;
  city: string;
  duration: string;
  language: string;
  deadline: string;
  description?: string;
  requirements?: string;
}

export interface MobilityApplication {
  id: number;
  studentName: string;
  studentId: string;
  personalId: string;
  university: string;
  programName: string;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  priority: number;
  date: string;
  programId: number;
}

export interface MinisterQuestion {
  id: number;
  studentName: string;
  personalId: string;
  subject: string;
  body: string;
  status: QuestionStatus;
  answer?: string;
  answeredAt?: string;
  date: string;
}

export interface SurveyQuestion {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  responses?: number[];
  textResponses?: string[];
  required?: boolean;
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  status: SurveyStatus;
  dueDate: string;
  target: SurveyTarget;
  targetId?: number;
  targetUniversity?: string;
  targetFaculty?: string;
  questions: SurveyQuestion[];
  responsesCount: number;
  averageTime?: string;
  durationDays?: number;
  completedByCurrentUser?: boolean;
}

export interface IssueReport {
  id: number;
  studentName: string;
  personalId: string;
  category: string;
  description: string;
  status: IssueStatus;
  adminFeedback?: string;
  date: string;
  photoUrl?: string;
  studentId?: string;
}

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: AdminRole;
  permissions: string[];
  active: boolean;
  createdAt: string;
}

export interface Offer {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  route: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface StudentAuthUser {
  id: string;
  role: 'student';
  personalId: string;
  fullName: string;
}

export interface AdminAuthUser {
  id: string;
  role: 'admin';
  username: string;
  permissions: string[];
}

export interface MobilityDeadline {
  startDate: string;
  endDate: string;
  isOpen: boolean;
}
