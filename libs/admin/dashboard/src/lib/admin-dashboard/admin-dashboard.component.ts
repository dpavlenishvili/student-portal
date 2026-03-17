import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MockStoreService } from '@portal/shared';

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
  protected readonly pendingQuestions = computed(() => this.store.ministerQuestions().filter(q => q.status === 'pending').length);
  protected readonly newIssues = computed(() => this.store.issues().filter(i => i.status === 'new').length);
}
