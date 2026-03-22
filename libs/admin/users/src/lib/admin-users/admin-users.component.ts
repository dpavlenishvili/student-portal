import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MockStoreService, AdminUser, AdminRole } from '@portal/shared';

@Component({
  selector: 'lib-admin-users',
  standalone: true,
  imports: [FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  protected readonly store = inject(MockStoreService);
  protected readonly searchTerm = signal('');
  protected readonly showForm = signal(false);
  protected readonly editingUser = signal<AdminUser | null>(null);
  protected readonly deleteTarget = signal<AdminUser | null>(null);

  protected readonly roles: { value: AdminRole; label: string }[] = [
    { value: 'super_admin', label: 'სუპერ ადმინი' },
    { value: 'moderator', label: 'მოდერატორი' },
    { value: 'analyst', label: 'ანალიტიკოსი' },
    { value: 'viewer', label: 'მნახველი' },
  ];

  protected readonly allPermissions = [
    { value: 'surveys', label: 'კვლევები' },
    { value: 'mobility', label: 'მობილობა' },
    { value: 'issues', label: 'პრობლემები' },
    { value: 'minister', label: 'მინისტრი' },
    { value: 'students', label: 'სტუდენტები' },
    { value: 'users', label: 'მომხმარებლები' },
  ];

  // Form fields
  protected formFirstName = '';
  protected formLastName = '';
  protected formEmail = '';
  protected formUsername = '';
  protected formRole: AdminRole = 'viewer';
  protected formPermissions: string[] = [];
  protected formActive = true;

  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.store.adminUsers().filter(u =>
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term)
    );
  });

  protected readonly roleLabel = (role: AdminRole): string => {
    const found = this.roles.find(r => r.value === role);
    return found ? found.label : role;
  };

  protected readonly roleClass = (role: AdminRole): string => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'moderator': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'analyst': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400';
      case 'viewer': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  openCreateForm(): void {
    this.resetForm();
    this.editingUser.set(null);
    this.showForm.set(true);
  }

  openEditForm(user: AdminUser): void {
    this.editingUser.set(user);
    this.formFirstName = user.firstName;
    this.formLastName = user.lastName;
    this.formEmail = user.email;
    this.formUsername = user.username;
    this.formRole = user.role;
    this.formPermissions = [...user.permissions];
    this.formActive = user.active;
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingUser.set(null);
    this.resetForm();
  }

  saveUser(): void {
    const userData = {
      firstName: this.formFirstName,
      lastName: this.formLastName,
      email: this.formEmail,
      username: this.formUsername,
      role: this.formRole,
      permissions: this.formPermissions,
      active: this.formActive,
    };

    const editing = this.editingUser();
    if (editing) {
      this.store.updateAdminUser(editing.id, userData);
    } else {
      this.store.addAdminUser(userData);
    }
    this.closeForm();
  }

  confirmDelete(user: AdminUser): void {
    this.deleteTarget.set(user);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  executeDelete(): void {
    const target = this.deleteTarget();
    if (target) {
      this.store.deleteAdminUser(target.id);
      this.deleteTarget.set(null);
    }
  }

  togglePermission(permission: string): void {
    const idx = this.formPermissions.indexOf(permission);
    if (idx > -1) {
      this.formPermissions = this.formPermissions.filter(p => p !== permission);
    } else {
      this.formPermissions = [...this.formPermissions, permission];
    }
  }

  hasPermission(permission: string): boolean {
    return this.formPermissions.includes(permission);
  }

  private resetForm(): void {
    this.formFirstName = '';
    this.formLastName = '';
    this.formEmail = '';
    this.formUsername = '';
    this.formRole = 'viewer';
    this.formPermissions = [];
    this.formActive = true;
  }
}
