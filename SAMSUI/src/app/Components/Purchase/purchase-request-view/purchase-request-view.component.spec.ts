import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseRequestViewComponent } from './purchase-request-view.component';

describe('PurchaseRequestViewComponent', () => {
  let component: PurchaseRequestViewComponent;
  let fixture: ComponentFixture<PurchaseRequestViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
