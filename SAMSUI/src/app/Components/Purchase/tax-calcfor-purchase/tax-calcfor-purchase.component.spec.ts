import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxCalcforPurchaseComponent } from './tax-calcfor-purchase.component';

describe('TaxCalcforPurchaseComponent', () => {
  let component: TaxCalcforPurchaseComponent;
  let fixture: ComponentFixture<TaxCalcforPurchaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCalcforPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCalcforPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
