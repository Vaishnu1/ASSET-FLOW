import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrOpenReportResultComponent } from './sr-open-report-result.component';

describe('SrOpenReportResultComponent', () => {
  let component: SrOpenReportResultComponent;
  let fixture: ComponentFixture<SrOpenReportResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrOpenReportResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrOpenReportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
