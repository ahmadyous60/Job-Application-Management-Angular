import { Injectable, Injector } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { JobPositionModalComponent } from '../../app/job-position/components/job-position-modal/job-position-modal.component';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class CustomDialogService {
  constructor(private injector: Injector) {}

  openJobPositionModal(data?: any): DynamicDialogRef {
    // Lazy inject DialogService
    const dialogService = this.injector.get(DialogService);

    return dialogService.open(JobPositionModalComponent, {
      data: data || null,
      header: data ? 'Edit Job Position' : 'Create Job Position',
      width: '500px',
      modal: true,
    });
  }

  // Optional: lazy access to MockDataService
  getMockDataService(): MockDataService {
    return this.injector.get(MockDataService);
  }
}
