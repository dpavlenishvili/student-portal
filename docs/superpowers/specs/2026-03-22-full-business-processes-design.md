# Student Portal — Full Business Processes Implementation Spec

## Overview
Implement all missing features from the business processes document to make both student and admin portals 100% functional.

## Gaps & Implementation Plan

### 1. Shared Foundation Updates

**Models** (`libs/shared/src/lib/models.ts`):
- Add `Notification` interface (id, type, title, message, date, read, link)
- Add `AdminUser` interface (id, username, email, role, permissions, fullName)
- Add `phone` field to `User`
- Add `SurveyStatus = 'draft' | 'active' | 'completed'` (add `draft`)
- Add `targetUniversity?` and `targetFaculty?` to `Survey`

**Mock Data** (`libs/shared/src/lib/mock-data.ts`):
- Add `MOCK_NOTIFICATIONS` array
- Add `MOCK_ADMIN_USERS` array
- Add `phone` to all student records

**MockStoreService** (`libs/shared/src/lib/mock-store.service.ts`):
- Add `notifications` signal
- Add `adminUsers` signal
- Add methods: `markNotificationRead()`, `markAllNotificationsRead()`
- Add methods: `addAdminUser()`, `updateAdminUser()`, `deleteAdminUser()`
- Add methods: `updateMobilityApplication()`, `deleteMobilityApplication()`
- Add methods: `updateSurvey()`, `publishSurvey()`, `submitSurveyResponse()`
- Add `mobilityDeadline` signal for deadline management

### 2. Student Portal Features

**Survey Filling UI** (`libs/student/surveys`):
- Replace "mark complete" button with actual survey form
- Show questions with radio buttons, checkboxes, text areas
- Validate all required questions answered
- Submit responses and mark as completed
- Show completed surveys differently

**Issue Report - History & Photo** (`libs/student/issue-report`):
- Add tabs: "ახალი შეტყობინება" / "ჩემი შეტყობინებები"
- Show list of user's submitted issues with status badges
- Click to expand issue details with admin feedback
- Working photo upload (base64 preview, stored in mock data)

**Mobility - Edit/Delete** (`libs/student/mobility`):
- Add edit button on submitted applications (not approved/rejected)
- Edit modal: change priority, switch program
- Delete button to remove application
- Show deadline info prominently

**Profile Enhancement** (`libs/student/profile`):
- Add phone number display
- Add "სერვისები" (services) section with linked services
- Add "შეთავაზებები" (offers/discounts) section

**Notification System** (`libs/student/dashboard`):
- Notification bell shows unread count
- Click opens notification panel/page
- List of notifications with read/unread states
- Mark as read on click
- Notifications generated for: new surveys, issue status changes, minister answers, mobility updates

### 3. Admin Portal Features

**Admin User Management** (new lib `libs/admin/users` or within `libs/admin/students`):
- Add route `/users` in admin app
- List admin users with roles
- Create/edit admin user form (name, email, username, role, permissions)
- Delete admin user with confirmation
- Add nav link in admin sidebar

**Survey Builder** (`libs/admin/surveys`):
- Full question editor in create modal
- Add question button: select type (radio/checkbox/text)
- For radio/checkbox: add/remove options
- Save as draft functionality
- Publish survey (makes it active, no more editing)
- Target audience selection (global/university/faculty with specific values)
- Published surveys show lock icon, not editable

**Survey Analytics** (`libs/admin/surveys`):
- Add filter bar: university, faculty, date range
- Pie charts or bar charts per question
- Export-ready data display

**Mobility Management** (`libs/admin/mobility`):
- Mobility deadline date picker (open/close window)
- Detailed application view with student info
- All applications tab (not just pending/approved)
- Rejected applications list

**Admin Dashboard** (`libs/admin/dashboard`):
- Add more KPI cards
- Surveys stats
- University breakdown chart
