import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPrReportComponent } from './sr-pr-report.component';

describe('SrOpenReportComponent', () => {
  let component: SrPrReportComponent;
  let fixture: ComponentFixture<SrPrReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
