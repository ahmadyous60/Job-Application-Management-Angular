import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPositionModalComponent } from './job-position-modal.component';

describe('JobPositionModalComponent', () => {
  let component: JobPositionModalComponent;
  let fixture: ComponentFixture<JobPositionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPositionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
