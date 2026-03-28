import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrFeedbackComponent } from './sr-feedback.component';

describe('SrFeedbackComponent', () => {
  let component: SrFeedbackComponent;
  let fixture: ComponentFixture<SrFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
