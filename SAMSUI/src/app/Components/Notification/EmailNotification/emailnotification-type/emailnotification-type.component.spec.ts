import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailnotificationTypeComponent } from './emailnotification-type.component';

describe('EmailnotificationTypeComponent', () => {
  let component: EmailnotificationTypeComponent;
  let fixture: ComponentFixture<EmailnotificationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailnotificationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailnotificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
