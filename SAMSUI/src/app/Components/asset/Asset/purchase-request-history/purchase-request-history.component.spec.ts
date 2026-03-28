import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestHistoryComponent } from './purchase-request-history.component';

describe('PurchaseRequestHistoryComponent', () => {
  let component: PurchaseRequestHistoryComponent;
  let fixture: ComponentFixture<PurchaseRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRequestHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
