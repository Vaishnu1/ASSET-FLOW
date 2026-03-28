import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelConfirmationWithoutReasonComponent } from './cancel-confirmation-without-reason.component';

describe('CancelConfirmationWithoutReasonComponent', () => {
  let component: CancelConfirmationWithoutReasonComponent;
  let fixture: ComponentFixture<CancelConfirmationWithoutReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelConfirmationWithoutReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelConfirmationWithoutReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
