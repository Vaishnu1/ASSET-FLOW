import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailnotificationSchedulerComponent } from '../emailnotification-scheduler.component';

describe('EmailnotificationSchedulerComponent', () => {
  let component: EmailnotificationSchedulerComponent;
  let fixture: ComponentFixture<EmailnotificationSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailnotificationSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailnotificationSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
