import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestReportComponent } from './service-request-report.component';

describe('ServiceRequestReportComponent', () => {
  let component: ServiceRequestReportComponent;
  let fixture: ComponentFixture<ServiceRequestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
