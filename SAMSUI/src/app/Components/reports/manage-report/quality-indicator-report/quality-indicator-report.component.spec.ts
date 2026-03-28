import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QualityIndicatorReportComponent } from './quality-indicator-report.component';

describe('QualityIndicatorReportComponent', () => {
  let component: QualityIndicatorReportComponent;
  let fixture: ComponentFixture<QualityIndicatorReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityIndicatorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityIndicatorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
