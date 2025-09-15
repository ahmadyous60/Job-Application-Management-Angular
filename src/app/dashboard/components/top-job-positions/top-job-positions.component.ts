import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPosition } from '../../../datamodels/jobpositinmodel';

@Component({
  selector: 'app-top-job-positions',
  templateUrl: './top-job-positions.component.html',
  styleUrls: ['./top-job-positions.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TopJobPositionsComponent implements OnInit, OnChanges {
  @Input() jobPositions: JobPosition[] = [];
  @Input() maxItems: number = 5;
  @Input() showViewAll: boolean = true;
  @Input() title: string = 'Top Job Positions by Applications';
  @Input() cardClass: string = '';
  @Input() loading: boolean = false;

  topPositions: JobPosition[] = [];

  constructor() {}

  ngOnInit(): void {
    this.updateTopPositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobPositions'] || changes['maxItems']) {
      this.updateTopPositions();
    }
  }

  private updateTopPositions(): void {
    if (!this.jobPositions || this.jobPositions.length === 0) {
      this.topPositions = [];
      return;
    }

    this.topPositions = [...this.jobPositions]
      .sort((a, b) => (b.applicantCount || 0) - (a.applicantCount || 0))
      .slice(0, this.maxItems);
  }

  getProgressPercentage(position: JobPosition): number {
    if (!this.topPositions.length) return 0;
    const maxCount = Math.max(...this.topPositions.map(p => p.applicantCount || 0), 1);
    return Math.min((position.applicantCount / maxCount) * 100, 100);
  }

  getTrendIcon(position: JobPosition): string {
    switch (position.trend) {
      case 'up': return 'pi-arrow-up';
      case 'down': return 'pi-arrow-down';
      default: return 'pi-minus';
    }
  }

  getTrendColor(position: JobPosition): string {
    switch (position.trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-danger';
      default: return 'text-secondary';
    }
  }

  getTrendTooltip(position: JobPosition): string {
    switch (position.trend) {
      case 'up': return 'Growing applications';
      case 'down': return 'Declining applications';
      default: return 'Stable applications';
    }
  }

  trackByPositionId(index: number, position: JobPosition): number {
    return position.id;
  }
}
