import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseOrderHistoryAuditComponent } from './purchase-order-history-audit.component';

describe('PurchaseOrderHistoryAuditComponent', () => {
  let component: PurchaseOrderHistoryAuditComponent;
  let fixture: ComponentFixture<PurchaseOrderHistoryAuditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderHistoryAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderHistoryAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
