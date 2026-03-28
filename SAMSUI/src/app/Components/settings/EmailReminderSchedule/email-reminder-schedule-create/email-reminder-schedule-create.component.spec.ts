import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailReminderScheduleCreateComponent } from './email-reminder-schedule-create.component';

describe('EmailReminderScheduleCreateComponent', () => {
  let component: EmailReminderScheduleCreateComponent;
  let fixture: ComponentFixture<EmailReminderScheduleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailReminderScheduleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailReminderScheduleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
