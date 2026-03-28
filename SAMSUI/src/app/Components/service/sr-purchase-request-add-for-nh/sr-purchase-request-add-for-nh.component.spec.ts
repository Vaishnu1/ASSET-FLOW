import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPurchaseRequestAddForNhComponent } from './sr-purchase-request-add-for-nh.component';

describe('SrPurchaseRequestAddForNhComponent', () => {
  let component: SrPurchaseRequestAddForNhComponent;
  let fixture: ComponentFixture<SrPurchaseRequestAddForNhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPurchaseRequestAddForNhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPurchaseRequestAddForNhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
