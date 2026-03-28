import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairServiceRequestReportComponent } from './repair-service-request-report.component';

describe('RepairServiceRequestReportComponent', () => {
  let component: RepairServiceRequestReportComponent;
  let fixture: ComponentFixture<RepairServiceRequestReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairServiceRequestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairServiceRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
