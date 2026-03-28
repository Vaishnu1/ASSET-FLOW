import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockenquiryDtlComponent } from './stockenquiry-dtl.component';

describe('StockenquiryDtlComponent', () => {
  let component: StockenquiryDtlComponent;
  let fixture: ComponentFixture<StockenquiryDtlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockenquiryDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockenquiryDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
