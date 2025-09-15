import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopJobPositionsComponent } from './top-job-positions.component';

describe('TopJobPositionsComponent', () => {
  let component: TopJobPositionsComponent;
  let fixture: ComponentFixture<TopJobPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopJobPositionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopJobPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
