import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseOrderCreateComponent } from './purchase-order-create.component';

describe('PurchaseOrderCreateComponent', () => {
  let component: PurchaseOrderCreateComponent;
  let fixture: ComponentFixture<PurchaseOrderCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
