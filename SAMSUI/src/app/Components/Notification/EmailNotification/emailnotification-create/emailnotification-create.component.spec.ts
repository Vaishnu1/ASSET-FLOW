import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailnotificationCreateComponent } from '../emailnotification-create.component';

describe('EmailnotificationCreateComponent', () => {
  let component: EmailnotificationCreateComponent;
  let fixture: ComponentFixture<EmailnotificationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailnotificationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailnotificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
