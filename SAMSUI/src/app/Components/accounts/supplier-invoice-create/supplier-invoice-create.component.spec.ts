import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInvoiceCreateComponent } from './supplier-invoice-create.component';

describe('SupplierInvoiceCreateComponent', () => {
  let component: SupplierInvoiceCreateComponent;
  let fixture: ComponentFixture<SupplierInvoiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierInvoiceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
