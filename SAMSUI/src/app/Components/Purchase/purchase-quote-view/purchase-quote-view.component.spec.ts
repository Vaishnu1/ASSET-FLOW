import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseQuoteViewComponent } from './purchase-quote-view.component';

describe('PurchaseQuoteViewComponent', () => {
  let component: PurchaseQuoteViewComponent;
  let fixture: ComponentFixture<PurchaseQuoteViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
