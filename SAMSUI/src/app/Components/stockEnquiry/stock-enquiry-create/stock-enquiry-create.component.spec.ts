import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockEnquiryCreateComponent } from './stock-enquiry-create.component';

describe('StockEnquiryCreateComponent', () => {
  let component: StockEnquiryCreateComponent;
  let fixture: ComponentFixture<StockEnquiryCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEnquiryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEnquiryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
