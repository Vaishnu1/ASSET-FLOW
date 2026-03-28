import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseReqForNhComponent } from './purchase-req-for-nh.component';

describe('PurchaseReqForNhComponent', () => {
  let component: PurchaseReqForNhComponent;
  let fixture: ComponentFixture<PurchaseReqForNhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReqForNhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReqForNhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
