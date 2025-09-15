import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobPosition } from '../../../datamodels/jobpositinmodel';
import { MockDataService } from '../../../services/mock-data.service';
import { CustomDialogService } from '../../../services/dialog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-job-position-list',
  standalone: true,
  templateUrl: './job-position-list.component.html',
  styleUrls: ['./job-position-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    TruncatePipe,
    DynamicDialogModule
  ]
})
export class JobPositionListComponent implements OnInit, OnDestroy {
  jobPositions: JobPosition[] = [];
  filteredJobPositions: JobPosition[] = [];
  loading = false;
  error = '';

  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  statusFilter = '';

  private subscriptions = new Subscription();

  // Lazy inject services
  private mockDataService = inject(MockDataService);
  private dialogService = inject(CustomDialogService);

  ngOnInit(): void {
    this.loadJobPositions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadJobPositions(): void {
    this.loading = true;
    this.subscriptions.add(
      this.mockDataService.getJobPositions().subscribe({
        next: positions => {
          this.jobPositions = positions;
          this.applyFilters();
          this.loading = false;
        },
        error: err => {
          this.error = 'Failed to load job positions';
          this.loading = false;
          console.error(err);
        }
      })
    );
  }

  openCreateModal(): void {
    const ref = this.dialogService.openJobPositionModal();
    this.subscriptions.add(
      ref.onClose.subscribe(result => {
        if (result) this.createJobPosition(result);
      })
    );
  }

  openEditModal(position: JobPosition): void {
    const ref = this.dialogService.openJobPositionModal(position);
    this.subscriptions.add(
      ref.onClose.subscribe(result => {
        if (result) this.updateJobPosition(position.id, result);
      })
    );
  }

  createJobPosition(data: any): void {
    this.subscriptions.add(
      this.mockDataService.createJobPosition(data).subscribe({
        next: newPosition => {
          this.jobPositions.push(newPosition);
          this.applyFilters();
        },
        error: err => console.error('Create failed', err)
      })
    );
  }

  updateJobPosition(id: number, data: any): void {
    this.subscriptions.add(
      this.mockDataService.updateJobPosition(id, data).subscribe({
        next: updated => {
          const idx = this.jobPositions.findIndex(p => p.id === id);
          if (idx !== -1) this.jobPositions[idx] = updated;
          this.applyFilters();
        },
        error: err => console.error('Update failed', err)
      })
    );
  }

  deleteJobPosition(id: number): void {
    if (!confirm('Are you sure you want to delete this job position?')) return;
    this.subscriptions.add(
      this.mockDataService.deleteJobPosition(id).subscribe({
        next: () => {
          this.jobPositions = this.jobPositions.filter(p => p.id !== id);
          this.applyFilters();
        },
        error: err => console.error('Delete failed', err)
      })
    );
  }

  // Filters
  onSearch(): void { this.applyFilters(); }
  onFilter(): void { this.applyFilters(); }

  applyFilters(): void {
    let filtered = this.jobPositions;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.requirements.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== '') {
      filtered = filtered.filter(p => p.isActive === (this.statusFilter === 'true'));
    }

    this.filteredJobPositions = filtered;
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  get pagedItems(): JobPosition[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobPositions.slice(start, start + this.itemsPerPage);
  }
}
