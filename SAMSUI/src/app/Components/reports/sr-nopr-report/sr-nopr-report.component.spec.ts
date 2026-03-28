import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrNoprReportComponent } from './sr-nopr-report.component';

describe('SrNoprReportComponent', () => {
  let component: SrNoprReportComponent;
  let fixture: ComponentFixture<SrNoprReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrNoprReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrNoprReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
