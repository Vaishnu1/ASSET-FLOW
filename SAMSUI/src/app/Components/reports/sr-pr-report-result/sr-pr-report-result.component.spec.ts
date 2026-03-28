import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPrReportResultComponent } from './sr-pr-report-result.component';

describe('SrPrReportResultComponent', () => {
  let component: SrPrReportResultComponent;
  let fixture: ComponentFixture<SrPrReportResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPrReportResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPrReportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
