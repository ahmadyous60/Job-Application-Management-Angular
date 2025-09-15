import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { Candidate } from '../../../datamodels/candidatemodel';
import { JobPosition } from '../../../datamodels/jobpositinmodel';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbPaginationModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  filteredItems: Candidate[] = [];
  pagedItems: Candidate[] = [];

  jobPositions: JobPosition[] = [];

  searchTerm: string = '';
  jobPositionFilter: string = '';
  dateFilter: string = '';

  currentPage = 1;
  itemsPerPage = 5;

  isMaxApplicantsReached = false;
  maxApplicantsPerPosition = 50;

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadJobPositions();
    this.loadCandidates();
    this.loadTenantSettings();
  }

  // ===== Load Data =====
  loadJobPositions() {
  this.candidateService.getJobPositions().subscribe(data => {
    this.jobPositions = data;
  });
}

  loadCandidates() {
    this.candidateService.getCandidates().subscribe(data => {
      this.candidates = data;
      this.applyFilters();
      this.checkMaxApplicants();
    });
  }

  loadTenantSettings() {
    this.candidateService.getTenantSettings().subscribe(settings => {
      this.maxApplicantsPerPosition = settings.maxApplicantsPerPosition;
      this.checkMaxApplicants();
    });
  }

  // ===== Filtering =====
  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilter() {
    this.currentPage = 1;
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.jobPositionFilter = '';
    this.dateFilter = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredItems = this.candidates.filter(candidate => {
      const matchesSearch = this.searchTerm
        ? (candidate.firstName + ' ' + candidate.lastName).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesJob = this.jobPositionFilter
        ? candidate.jobPositionId === +this.jobPositionFilter
        : true;

      const matchesDate = this.dateFilter
        ? new Date(candidate.applicationDate).toDateString() === new Date(this.dateFilter).toDateString()
        : true;

      return matchesSearch && matchesJob && matchesDate;
    });

    this.updatePagedItems();
  }

  // ===== Pagination =====
  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.updatePagedItems();
  }

  // ===== Candidate Actions =====
 deleteCandidate(id: number) {
  if (confirm('Are you sure you want to delete this candidate?')) {
    this.candidateService.deleteCandidate(id).subscribe(() => {
      // Reload the candidates after deletion
      this.loadCandidates();
    });
  }
}

  openEditModal(candidate: Candidate) {
    alert('Open Edit Modal for ' + candidate.firstName);
  }

  // ===== Helpers =====
  getJobPositionInfo(id: number): string {
    const position = this.jobPositions.find(p => p.id === id);
    return position ? `${position.title} ${position.isActive ? '' : '(Closed)'}` : 'Unknown';
  }

  checkMaxApplicants() {
    if (!this.jobPositionFilter) {
      this.isMaxApplicantsReached = false;
      return;
    }
    const count = this.candidates.filter(c => c.jobPositionId === +this.jobPositionFilter).length;
    this.isMaxApplicantsReached = count >= this.maxApplicantsPerPosition;
  }
}
