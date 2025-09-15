import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Candidate } from '../datamodels/candidatemodel';
import { JobPosition } from '../datamodels/jobpositinmodel';
import { TenantSettings } from '../datamodels/tenant-setting.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private dbData: any = null;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // This would typically load from db.json in a real implementation
    // For now, we'll use the data structure we created
    this.dbData = {
      jobPositions: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          description: "We are looking for an experienced frontend developer to join our team. You will be responsible for building responsive web applications using Angular, React, or Vue.js.",
          requirements: "5+ years of frontend development experience, proficiency in JavaScript/TypeScript, experience with modern frameworks (Angular, React, Vue), knowledge of CSS preprocessors, Git version control",
          isActive: true,
          createdAt: "2024-01-15T10:00:00.000Z",
          updatedAt: "2024-01-20T14:30:00.000Z",
          applicantCount: 12,
          trend: "up"
        },
        {
          id: 2,
          title: "Full Stack Developer",
          description: "Join our development team as a full stack developer. You'll work on both frontend and backend systems, building scalable web applications.",
          requirements: "3+ years of full stack development, proficiency in JavaScript/TypeScript, experience with Node.js, React/Angular, databases (PostgreSQL/MongoDB), RESTful APIs",
          isActive: true,
          createdAt: "2024-01-10T09:00:00.000Z",
          updatedAt: "2024-01-18T16:45:00.000Z",
          applicantCount: 8,
          trend: "stable"
        },
        {
          id: 3,
          title: "DevOps Engineer",
          description: "We need a DevOps engineer to help us scale our infrastructure and improve our deployment processes.",
          requirements: "4+ years of DevOps experience, knowledge of AWS/Azure/GCP, Docker, Kubernetes, CI/CD pipelines, monitoring tools (Prometheus, Grafana)",
          isActive: true,
          createdAt: "2024-01-12T11:30:00.000Z",
          updatedAt: "2024-01-19T13:20:00.000Z",
          applicantCount: 5,
          trend: "down"
        },
        {
          id: 4,
          title: "UI/UX Designer",
          description: "Create beautiful and intuitive user experiences for our web and mobile applications.",
          requirements: "3+ years of UI/UX design experience, proficiency in Figma, Adobe Creative Suite, knowledge of design systems, user research experience",
          isActive: true,
          createdAt: "2024-01-08T14:15:00.000Z",
          updatedAt: "2024-01-17T10:30:00.000Z",
          applicantCount: 15,
          trend: "up"
        },
        {
          id: 5,
          title: "Data Scientist",
          description: "Analyze complex data sets to help drive business decisions and improve our products.",
          requirements: "Master's degree in Data Science or related field, 3+ years of experience, proficiency in Python/R, machine learning, SQL, statistical analysis",
          isActive: false,
          createdAt: "2024-01-05T08:45:00.000Z",
          updatedAt: "2024-01-15T12:00:00.000Z",
          applicantCount: 3,
          trend: "stable"
        }
      ],
      candidates: [
        {
          id: 1,
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@email.com",
          phone: "+1-555-0123",
          jobPositionId: 1,
          applicationDate: "2024-01-20T09:30:00.000Z",
          resumeUrl: "/resumes/john_smith_resume.pdf",
          status: "new"
        },
        {
          id: 2,
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1-555-0124",
          jobPositionId: 1,
          applicationDate: "2024-01-19T14:20:00.000Z",
          resumeUrl: "/resumes/sarah_johnson_resume.pdf",
          status: "reviewed"
        },
        {
          id: 3,
          firstName: "Michael",
          lastName: "Brown",
          email: "michael.brown@email.com",
          phone: "+1-555-0125",
          jobPositionId: 2,
          applicationDate: "2024-01-18T11:15:00.000Z",
          resumeUrl: "/resumes/michael_brown_resume.pdf",
          status: "interviewed"
        },
        {
          id: 4,
          firstName: "Emily",
          lastName: "Davis",
          email: "emily.davis@email.com",
          phone: "+1-555-0126",
          jobPositionId: 2,
          applicationDate: "2024-01-17T16:45:00.000Z",
          resumeUrl: "/resumes/emily_davis_resume.pdf",
          status: "hired"
        },
        {
          id: 5,
          firstName: "David",
          lastName: "Wilson",
          email: "david.wilson@email.com",
          phone: "+1-555-0127",
          jobPositionId: 3,
          applicationDate: "2024-01-16T13:30:00.000Z",
          resumeUrl: "/resumes/david_wilson_resume.pdf",
          status: "rejected"
        },
        {
          id: 6,
          firstName: "Lisa",
          lastName: "Anderson",
          email: "lisa.anderson@email.com",
          phone: "+1-555-0128",
          jobPositionId: 4,
          applicationDate: "2024-01-15T10:20:00.000Z",
          resumeUrl: "/resumes/lisa_anderson_resume.pdf",
          status: "new"
        },
        {
          id: 7,
          firstName: "Robert",
          lastName: "Taylor",
          email: "robert.taylor@email.com",
          phone: "+1-555-0129",
          jobPositionId: 4,
          applicationDate: "2024-01-14T15:10:00.000Z",
          resumeUrl: "/resumes/robert_taylor_resume.pdf",
          status: "reviewed"
        },
        {
          id: 8,
          firstName: "Jennifer",
          lastName: "Martinez",
          email: "jennifer.martinez@email.com",
          phone: "+1-555-0130",
          jobPositionId: 1,
          applicationDate: "2024-01-13T12:00:00.000Z",
          resumeUrl: "/resumes/jennifer_martinez_resume.pdf",
          status: "interviewed"
        },
        {
          id: 9,
          firstName: "Christopher",
          lastName: "Garcia",
          email: "christopher.garcia@email.com",
          phone: "+1-555-0131",
          jobPositionId: 2,
          applicationDate: "2024-01-12T09:45:00.000Z",
          resumeUrl: "/resumes/christopher_garcia_resume.pdf",
          status: "hired"
        },
        {
          id: 10,
          firstName: "Amanda",
          lastName: "Lee",
          email: "amanda.lee@email.com",
          phone: "+1-555-0132",
          jobPositionId: 3,
          applicationDate: "2024-01-11T14:30:00.000Z",
          resumeUrl: "/resumes/amanda_lee_resume.pdf",
          status: "new"
        },
        {
          id: 11,
          firstName: "James",
          lastName: "White",
          email: "james.white@email.com",
          phone: "+1-555-0133",
          jobPositionId: 4,
          applicationDate: "2024-01-10T11:20:00.000Z",
          resumeUrl: "/resumes/james_white_resume.pdf",
          status: "reviewed"
        },
        {
          id: 12,
          firstName: "Michelle",
          lastName: "Harris",
          email: "michelle.harris@email.com",
          phone: "+1-555-0134",
          jobPositionId: 1,
          applicationDate: "2024-01-09T16:15:00.000Z",
          resumeUrl: "/resumes/michelle_harris_resume.pdf",
          status: "rejected"
        }
      ],
      tenantSettings: {
        maxApplicantsPerPosition: 50,
        allowedResumeFormats: ["pdf", "doc", "docx"],
        autoExpireDays: 30,
        notifyLowApplications: true,
        lowApplicationThreshold: 3
      }
    };
  }

  // Job Position methods
  getJobPositions(): Observable<JobPosition[]> {
    return of(this.dbData.jobPositions).pipe(delay(300));
  }

  getJobPosition(id: number): Observable<JobPosition> {
    const position = this.dbData.jobPositions.find((p: JobPosition) => p.id === id);
    return of(position).pipe(delay(200));
  }

  createJobPosition(jobPosition: JobPosition): Observable<JobPosition> {
    const newId = Math.max(...this.dbData.jobPositions.map((p: JobPosition) => p.id)) + 1;
    const newPosition = { ...jobPosition, id: newId };
    this.dbData.jobPositions.push(newPosition);
    return of(newPosition).pipe(delay(500));
  }

  updateJobPosition(id: number, jobPosition: JobPosition): Observable<JobPosition> {
    const index = this.dbData.jobPositions.findIndex((p: JobPosition) => p.id === id);
    if (index !== -1) {
      this.dbData.jobPositions[index] = { ...jobPosition, id };
      return of(this.dbData.jobPositions[index]).pipe(delay(400));
    }
    throw new Error('Job position not found');
  }

  deleteJobPosition(id: number): Observable<void> {
    const index = this.dbData.jobPositions.findIndex((p: JobPosition) => p.id === id);
    if (index !== -1) {
      this.dbData.jobPositions.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    throw new Error('Job position not found');
  }

  // Candidate methods
  getCandidates(): Observable<Candidate[]> {
    return of(this.dbData.candidates).pipe(delay(300));
  }

  getCandidate(id: number): Observable<Candidate> {
    const candidate = this.dbData.candidates.find((c: Candidate) => c.id === id);
    return of(candidate).pipe(delay(200));
  }

  getCandidatesByJobPosition(jobPositionId: number): Observable<Candidate[]> {
    const candidates = this.dbData.candidates.filter((c: Candidate) => c.jobPositionId === jobPositionId);
    return of(candidates).pipe(delay(200));
  }

  getCandidatesByStatus(status: string): Observable<Candidate[]> {
    const candidates = this.dbData.candidates.filter((c: Candidate) => c.status === status);
    return of(candidates).pipe(delay(200));
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    const newId = Math.max(...this.dbData.candidates.map((c: Candidate) => c.id)) + 1;
    const newCandidate = { ...candidate, id: newId };
    this.dbData.candidates.push(newCandidate);
    return of(newCandidate).pipe(delay(500));
  }

  updateCandidate(id: number, candidate: Candidate): Observable<Candidate> {
    const index = this.dbData.candidates.findIndex((c: Candidate) => c.id === id);
    if (index !== -1) {
      this.dbData.candidates[index] = { ...candidate, id };
      return of(this.dbData.candidates[index]).pipe(delay(400));
    }
    throw new Error('Candidate not found');
  }
 deleteCandidate(id: number): Observable<void> {
  const index = this.dbData.candidates.findIndex((c: Candidate) => c.id === id);
  if (index !== -1) {
    this.dbData.candidates.splice(index, 1);
  }
  return of(void 0); // Observable<void>
}




  // Tenant Settings methods
  getTenantSettings(): Observable<TenantSettings> {
    return of(this.dbData.tenantSettings).pipe(delay(200));
  }

  updateTenantSettings(settings: TenantSettings): Observable<TenantSettings> {
    this.dbData.tenantSettings = { ...settings };
    return of(this.dbData.tenantSettings).pipe(delay(400));
  }
}
