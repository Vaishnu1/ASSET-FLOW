import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseOrderViewComponent } from './purchase-order-view.component';

describe('PurchaseOrderViewComponent', () => {
  let component: PurchaseOrderViewComponent;
  let fixture: ComponentFixture<PurchaseOrderViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
