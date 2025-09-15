import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// ✅ Standalone components and pipes
import { JobPositionListComponent } from './components/job-position-list/job-position-list.component';
import { JobPositionModalComponent } from './components/job-position-modal/job-position-modal.component';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,          
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,

   
    JobPositionListComponent,
    JobPositionModalComponent,
    TruncatePipe
  ],
  exports: [
    JobPositionListComponent
  ]
})
export class JobPositionModule {}
