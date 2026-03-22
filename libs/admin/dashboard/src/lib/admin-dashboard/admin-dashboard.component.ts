import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MockStoreService } from '@portal/shared';

interface ActivityItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  text: string;
  detail: string;
  date: string;
  type: string;
}

@Component({
  selector: 'portal-admin-dashboard',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly chartHeights = [40, 60, 30, 80, 50, 90, 70, 45, 65, 85, 55, 75];
  protected readonly months = ['იან','თებ','მარ','აპრ','მაი','ივნ','ივლ','აგვ','სექ','ოქტ','ნოე','დეკ'];

  protected readonly pendingQuestions = computed(() =>
    this.store.ministerQuestions().filter(q => q.status === 'pending').length
  );

  protected readonly newIssues = computed(() =>
    this.store.issues().filter(i => i.status === 'new').length
  );

  protected readonly totalSurveys = computed(() => this.store.surveys().length);

  protected readonly activeSurveys = computed(() =>
    this.store.surveys().filter(s => s.status === 'active').length
  );

  protected readonly totalAdminUsers = computed(() => this.store.adminUsers().length);

  protected readonly totalResponses = computed(() =>
    this.store.surveys().reduce((sum, s) => sum + s.responsesCount, 0)
  );

  // University breakdown: count students per university
  protected readonly universityBreakdown = computed(() => {
    const map = new Map<string, number>();
    for (const student of this.store.allStudents()) {
      map.set(student.university, (map.get(student.university) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([university, count]) => ({ university, count }))
      .sort((a, b) => b.count - a.count);
  });

  protected readonly maxUniversityCount = computed(() =>
    Math.max(...this.universityBreakdown().map(u => u.count), 1)
  );

  // Recent activity feed: merge issues, questions, applications, sort by date
  protected readonly recentActivity = computed<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];

    for (const app of this.store.mobilityApplications().slice(0, 5)) {
      items.push({
        icon: 'fa-solid fa-file-signature',
        iconBg: 'bg-blue-50 dark:bg-blue-900/30',
        iconColor: 'text-blue-500',
        text: app.studentName,
        detail: 'შეავსო განაცხადი მობილობაზე',
        date: app.date,
        type: 'mobility',
      });
    }

    for (const issue of this.store.issues().slice(0, 5)) {
      items.push({
        icon: 'fa-solid fa-triangle-exclamation',
        iconBg: 'bg-red-50 dark:bg-red-900/30',
        iconColor: 'text-red-500',
        text: issue.studentName,
        detail: `ხარვეზი: ${issue.category}`,
        date: issue.date,
        type: 'issue',
      });
    }

    for (const q of this.store.ministerQuestions().slice(0, 5)) {
      items.push({
        icon: 'fa-solid fa-envelope',
        iconBg: 'bg-orange-50 dark:bg-orange-900/30',
        iconColor: 'text-orange-500',
        text: q.studentName,
        detail: `შეკითხვა: ${q.subject}`,
        date: q.date,
        type: 'question',
      });
    }

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  });
}
