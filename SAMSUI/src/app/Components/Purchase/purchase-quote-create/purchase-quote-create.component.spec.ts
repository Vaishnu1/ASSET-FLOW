import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseQuoteCreateComponent } from './purchase-quote-create.component';

describe('PurchaseQuoteCreateComponent', () => {
  let component: PurchaseQuoteCreateComponent;
  let fixture: ComponentFixture<PurchaseQuoteCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuoteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
