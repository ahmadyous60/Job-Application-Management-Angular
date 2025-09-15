// tenant-settings.model.ts
export interface TenantSettings {
  maxApplicantsPerPosition: number;
  allowedResumeFormats: string[];
  autoExpireDays: number;
  notifyLowApplications: boolean;
  lowApplicationThreshold: number;
}