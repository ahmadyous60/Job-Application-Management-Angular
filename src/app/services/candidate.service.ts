import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../datamodels/candidatemodel';
import { JobPosition } from '../datamodels/jobpositinmodel';
import { TenantSettings } from '../datamodels/tenant-setting.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:3000';  // ✅ root only
  private candidatesUrl = `${this.baseUrl}/candidates`;

  constructor(private http: HttpClient) {}

  // ===== Candidates =====
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.candidatesUrl);
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.candidatesUrl}/${id}`);
  }

  getCandidatesByJobPosition(jobPositionId: number): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.candidatesUrl}?jobPositionId=${jobPositionId}`);
  }

  getCandidatesByStatus(status: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.candidatesUrl}?status=${status}`);
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.candidatesUrl, candidate);
  }

  updateCandidate(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.candidatesUrl}/${id}`, candidate);
  }

  updateCandidateStatus(id: number, status: Candidate['status']): Observable<Candidate> {
    return this.http.patch<Candidate>(`${this.candidatesUrl}/${id}`, { status });
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.candidatesUrl}/${id}`);
  }

  searchCandidates(query: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.candidatesUrl}?q=${encodeURIComponent(query)}`);
  }

  // ===== Job Positions =====
  getJobPositions(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.baseUrl}/jobPositions`);
  }

  // ===== Tenant Settings =====
  getTenantSettings(): Observable<TenantSettings> {
    return this.http.get<TenantSettings>(`${this.baseUrl}/tenantSettings`);
  }
}
