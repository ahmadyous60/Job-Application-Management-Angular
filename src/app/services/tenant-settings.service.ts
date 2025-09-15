import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TenantSettings } from '../datamodels/tenant-setting.model';

@Injectable({
  providedIn: 'root'
})
export class TenantSettingsService {
  private apiUrl = 'http://localhost:3000/tenantSettings';
  private settingsSubject = new BehaviorSubject<TenantSettings | null>(null);
  public settings$ = this.settingsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get tenant settings
  getTenantSettings(): Observable<TenantSettings> {
    return this.http.get<TenantSettings>(this.apiUrl);
  }

  // Update tenant settings
  updateTenantSettings(settings: TenantSettings): Observable<TenantSettings> {
    return this.http.put<TenantSettings>(this.apiUrl, settings);
  }

  // Update specific setting
  updateSetting(key: keyof TenantSettings, value: any): Observable<TenantSettings> {
    return this.http.patch<TenantSettings>(this.apiUrl, { [key]: value });
  }

  // Reset settings to default
  resetToDefaults(): Observable<TenantSettings> {
    return this.http.post<TenantSettings>(`${this.apiUrl}/reset`, {});
  }

  // Validate resume format
  validateResumeFormat(fileName: string): boolean {
    const settings = this.settingsSubject.value;
    if (!settings) return false;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    return settings.allowedResumeFormats.includes(extension || '');
  }

  // Check if position has low applications
  isLowApplications(applicantCount: number): boolean {
    const settings = this.settingsSubject.value;
    if (!settings) return false;
    
    return settings.notifyLowApplications && applicantCount <= settings.lowApplicationThreshold;
  }

  // Check if position should be auto-expired
  shouldAutoExpire(createdAt: Date): boolean {
    const settings = this.settingsSubject.value;
    if (!settings) return false;
    
    const daysSinceCreation = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceCreation >= settings.autoExpireDays;
  }

  // Update local settings (for real-time updates)
  updateLocalSettings(settings: TenantSettings): void {
    this.settingsSubject.next(settings);
  }
}
