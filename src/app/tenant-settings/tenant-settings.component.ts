// tenant-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-settings.component.html',
  styleUrls: ['./tenant-settings.component.scss']
})
export class TenantSettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  // Example current settings
  currentSettings = {
    maxApplicantsPerPosition: 100,
    allowPdf: true,
    allowDocx: false,
    allowJpg: false,
    allowPng: false,
    autoExpireDays: 30,
    notifyLowApplications: true
  };

  // Example job positions near limit
  positionsNearLimit = [
    { title: 'Frontend Developer', applicantCount: 95 },
    { title: 'Backend Engineer', applicantCount: 88 }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      maxApplicantsPerPosition: [
        this.currentSettings.maxApplicantsPerPosition,
        [Validators.required, Validators.min(1)]
      ],
      allowPdf: [this.currentSettings.allowPdf],
      allowDocx: [this.currentSettings.allowDocx],
      allowJpg: [this.currentSettings.allowJpg],
      allowPng: [this.currentSettings.allowPng],
      autoExpireDays: [
        this.currentSettings.autoExpireDays,
        [Validators.required, Validators.min(0)]
      ],
      notifyLowApplications: [this.currentSettings.notifyLowApplications]
    });
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const updatedSettings = this.settingsForm.value;
      console.log('Saved settings:', updatedSettings);

      // ✅ Reset dirty state after saving
      this.currentSettings = { ...updatedSettings };
      this.settingsForm.markAsPristine();
    }
  }

  isNearLimit(): boolean {
    return this.positionsNearLimit.some(
      pos => pos.applicantCount >= this.currentSettings.maxApplicantsPerPosition * 0.9
    );
  }
}
