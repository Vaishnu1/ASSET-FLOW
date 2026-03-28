import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPrdaysReportComponent } from './sr-prdays-report.component';

describe('SrPrdaysReportComponent', () => {
  let component: SrPrdaysReportComponent;
  let fixture: ComponentFixture<SrPrdaysReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPrdaysReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPrdaysReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
