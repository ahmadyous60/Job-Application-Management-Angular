import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule , TruncatePipe],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  stats = {
    totalPositions: 12,
    activePositions: 7,
    totalCandidates: 58,
    recentApplications: 10
  };

  topJobPositions = [
    { title: 'Frontend Developer', description: 'Angular, React experience', applicationCount: 25, isActive: true, trend: 'up' },
    { title: 'Backend Developer', description: 'Laravel, Node.js', applicationCount: 18, isActive: true, trend: 'stable' },
    { title: 'UI/UX Designer', description: 'Figma, Adobe XD', applicationCount: 15, isActive: false, trend: 'down' },
    { title: 'Data Analyst', description: 'Python, SQL, Power BI', applicationCount: 12, isActive: true, trend: 'up' },
    { title: 'Project Manager', description: 'Agile, Scrum', applicationCount: 10, isActive: true, trend: 'stable' }
  ];

  recentActivities = [
    { title: 'New Application', description: 'John Doe applied for Frontend Developer', type: 'primary', time: new Date() },
    { title: 'Position Closed', description: 'Backend Developer role closed', type: 'danger', time: new Date() },
    { title: 'Interview Scheduled', description: 'UI/UX Designer interview for Sarah', type: 'success', time: new Date() }
  ];
}
