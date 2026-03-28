import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupConfirmationGatepassComponent } from './popup-confirmation-gatepass.component';

describe('PopupConfirmationGatepassComponent', () => {
  let component: PopupConfirmationGatepassComponent;
  let fixture: ComponentFixture<PopupConfirmationGatepassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupConfirmationGatepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfirmationGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
