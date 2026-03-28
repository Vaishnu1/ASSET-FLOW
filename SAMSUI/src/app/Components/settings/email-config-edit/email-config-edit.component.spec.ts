import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfigEditComponent } from './email-config-edit.component';

describe('EmailConfigEditComponent', () => {
  let component: EmailConfigEditComponent;
  let fixture: ComponentFixture<EmailConfigEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfigEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
