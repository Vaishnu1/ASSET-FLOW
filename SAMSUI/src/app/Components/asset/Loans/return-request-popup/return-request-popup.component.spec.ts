import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReturnRequestPopupComponent } from './return-request-popup.component';

describe('ReturnRequestPopupComponent', () => {
  let component: ReturnRequestPopupComponent;
  let fixture: ComponentFixture<ReturnRequestPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRequestPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
