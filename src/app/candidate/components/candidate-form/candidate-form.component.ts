import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from '../../../datamodels/candidatemodel';
import { JobPosition } from '../../../datamodels/jobpositinmodel';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-form.component.html',
})
export class CandidateFormComponent implements OnInit {
  @Input() jobPositions: JobPosition[] = [];
  @Output() saveCandidate = new EventEmitter<Candidate>();

  candidate: Candidate = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobPositionId: 0,
    applicationDate: new Date(),
    resumeUrl: '',
    status: 'new'
  };

  constructor(private router: Router, private candidateService: CandidateService) {}

  ngOnInit() {
    // ✅ Fetch job positions if not passed from parent
    if (!this.jobPositions.length) {
      this.candidateService.getJobPositions().subscribe(data => {
        this.jobPositions = data;
      });
    }
  }

  // ✅ Resume upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // For now, just save the file name (in real app, upload file to server)
      this.candidate.resumeUrl = file.name;
    }
  }

  // ✅ Submit candidate
  onSubmit(form: any) {
    if (form.valid) {
      this.candidateService.createCandidate(this.candidate).subscribe(() => {
        alert('Candidate added successfully!');
        this.resetForm();
        this.router.navigate(['/candidates']);
      });
    }
  }

  // ✅ Cancel
  onCancel() {
    this.resetForm();
    this.router.navigate(['/candidates']);
  }

  resetForm() {
    this.candidate = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jobPositionId: 0,
      applicationDate: new Date(),
      resumeUrl: '',
      status: 'new'
    };
  }
}
