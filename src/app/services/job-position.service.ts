// job-position.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JobPosition } from '../datamodels/jobpositinmodel';

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private apiUrl = 'http://localhost:3000/jobPositions';
  private jobPositionsSubject = new BehaviorSubject<JobPosition[]>([]);
  public jobPositions$ = this.jobPositionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get all job positions
  getJobPositions(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(this.apiUrl);
  }

  // Get active job positions only
  getActiveJobPositions(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}?isActive=true`);
  }

  // Get a single job position by ID
  getJobPosition(id: number): Observable<JobPosition> {
    return this.http.get<JobPosition>(`${this.apiUrl}/${id}`);
  }

  // Create a new job position
  createJobPosition(jobPosition: JobPosition): Observable<JobPosition> {
    return this.http.post<JobPosition>(this.apiUrl, jobPosition);
  }

  // Update existing job position
  updateJobPosition(id: number, jobPosition: JobPosition): Observable<JobPosition> {
    return this.http.put<JobPosition>(`${this.apiUrl}/${id}`, jobPosition);
  }

  // Toggle job position active status
  toggleJobPositionStatus(id: number): Observable<JobPosition> {
    return this.http.patch<JobPosition>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  // Delete job position
  deleteJobPosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get top job positions (with optional limit)
  getTopJobPositions(limit: number = 5): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}/top?limit=${limit}`);
  }

  // Search job positions
  searchJobPositions(query: string): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }

  // Get job positions by trend
  getJobPositionsByTrend(trend: 'up' | 'down' | 'stable'): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}?trend=${trend}`);
  }

  // Get job position statistics
  getJobPositionStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }

  // Update applicant count for a position
  updateApplicantCount(id: number, count: number): Observable<JobPosition> {
    return this.http.patch<JobPosition>(`${this.apiUrl}/${id}/applicant-count`, { applicantCount: count });
  }

  // Increment applicant count
  incrementApplicantCount(id: number): Observable<JobPosition> {
    return this.http.patch<JobPosition>(`${this.apiUrl}/${id}/increment-applicants`, {});
  }

  // Decrement applicant count
  decrementApplicantCount(id: number): Observable<JobPosition> {
    return this.http.patch<JobPosition>(`${this.apiUrl}/${id}/decrement-applicants`, {});
  }

  // Update local job positions list (for real-time updates)
  updateJobPositionsList(jobPositions: JobPosition[]): void {
    this.jobPositionsSubject.next(jobPositions);
  }
}
