import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManufacturerDetailedReportComponent } from './manufacturer-detailed-report.component';

describe('ManufacturerDetailedReportComponent', () => {
  let component: ManufacturerDetailedReportComponent;
  let fixture: ComponentFixture<ManufacturerDetailedReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerDetailedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
