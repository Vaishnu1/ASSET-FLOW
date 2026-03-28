import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetireDisposeRejectPopupComponent } from './retire-dispose-reject-popup.component';

describe('RetireDisposeRejectPopupComponent', () => {
  let component: RetireDisposeRejectPopupComponent;
  let fixture: ComponentFixture<RetireDisposeRejectPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetireDisposeRejectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetireDisposeRejectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
