import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectConfirmationComponent } from './reject-confirmation.component';

describe('RejectConfirmationComponent', () => {
  let component: RejectConfirmationComponent;
  let fixture: ComponentFixture<RejectConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
