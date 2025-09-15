// candidate.model.ts
export interface Candidate {
  id?: number; // Optional for new candidates
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobPositionId: number;
  applicationDate: Date;
  resumeUrl?: string;
  resumeFile?: File; // For file uploads
  status: 'new' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
}