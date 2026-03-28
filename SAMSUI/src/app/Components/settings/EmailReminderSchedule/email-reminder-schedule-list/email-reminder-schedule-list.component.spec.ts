import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailReminderScheduleListComponent } from './email-reminder-schedule-list.component';

describe('EmailReminderScheduleListComponent', () => {
  let component: EmailReminderScheduleListComponent;
  let fixture: ComponentFixture<EmailReminderScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailReminderScheduleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailReminderScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
