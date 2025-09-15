// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard/components/dashboard-home/dashboard-home.component';
import { JobPositionListComponent } from './job-position/components/job-position-list/job-position-list.component';
import { CandidateListComponent } from './candidate/components/candidate-list/candidate-list.component';
import { TenantSettingsComponent } from './tenant-settings/tenant-settings.component';
import { CandidateFormComponent } from './candidate/components/candidate-form/candidate-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'job-positions', component: JobPositionListComponent },
  { path: 'candidates', component: CandidateListComponent },
  {path: 'candidates/new', component: CandidateFormComponent},
  { path: 'settings', component: TenantSettingsComponent },
  { path: '**', redirectTo: '/dashboard' }
];
