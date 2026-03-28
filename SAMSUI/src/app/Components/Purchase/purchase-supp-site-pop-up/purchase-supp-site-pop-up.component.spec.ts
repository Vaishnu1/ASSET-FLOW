import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseSuppSitePopUpComponent } from './purchase-supp-site-pop-up.component';

describe('PurchaseSuppSitePopUpComponent', () => {
  let component: PurchaseSuppSitePopUpComponent;
  let fixture: ComponentFixture<PurchaseSuppSitePopUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSuppSitePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSuppSitePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
