import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { JobPosition } from '../../../datamodels/jobpositinmodel';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-position-modal',
  standalone: true,
  templateUrl: './job-position-modal.component.html',
  styleUrls: ['./job-position-modal.component.scss'],
  imports: [NgIf, CommonModule, FormsModule, ReactiveFormsModule]
})
export class JobPositionModalComponent implements OnInit {
  jobPositionForm: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.jobPositionForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.config.data?.jobPosition) {
      this.isEditMode = true;
      this.populateForm(this.config.data.jobPosition);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      requirements: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      isActive: [true]
    });
  }

  private populateForm(jobPosition: JobPosition): void {
    this.jobPositionForm.patchValue({
      title: jobPosition.title,
      description: jobPosition.description,
      requirements: jobPosition.requirements,
      isActive: jobPosition.isActive
    });
  }

  onSubmit(): void {
    if (this.jobPositionForm.valid) {
      this.loading = true;
      this.jobPositionForm.disable();

      // Simulate API call
      setTimeout(() => {
        this.ref.close(this.jobPositionForm.getRawValue());
        this.loading = false;
        this.jobPositionForm.enable();
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.ref.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.jobPositionForm.controls).forEach(key => {
      this.jobPositionForm.get(key)?.markAsTouched();
    });
  }

  // 🔹 Centralized error messages
  getErrorMessage(controlName: string): string | null {
    const control = this.jobPositionForm.get(controlName);

    if (!control || !control.touched || control.valid) return null;

    if (control.hasError('required')) {
      return `${this.formatLabel(controlName)} is required`;
    }

    if (control.hasError('minlength')) {
      return `${this.formatLabel(controlName)} must be at least ${control.errors?.['minlength']?.requiredLength} characters`;
    }

    if (control.hasError('maxlength')) {
      return `${this.formatLabel(controlName)} cannot exceed ${control.errors?.['maxlength']?.requiredLength} characters`;
    }

    return null;
  }

  private formatLabel(controlName: string): string {
    switch (controlName) {
      case 'title': return 'Job title';
      case 'description': return 'Description';
      case 'requirements': return 'Requirements';
      default: return controlName;
    }
  }

  // 🔹 Getters for template
  get title() { return this.jobPositionForm.get('title'); }
  get description() { return this.jobPositionForm.get('description'); }
  get requirements() { return this.jobPositionForm.get('requirements'); }
}
