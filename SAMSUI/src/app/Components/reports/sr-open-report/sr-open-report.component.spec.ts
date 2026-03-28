import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrOpenReportComponent } from './sr-open-report.component';

describe('SrOpenReportComponent', () => {
  let component: SrOpenReportComponent;
  let fixture: ComponentFixture<SrOpenReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrOpenReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrOpenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
