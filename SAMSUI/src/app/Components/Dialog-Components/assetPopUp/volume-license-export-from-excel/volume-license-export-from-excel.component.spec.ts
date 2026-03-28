import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VolumeLicenseExportFromExcelComponent } from './volume-license-export-from-excel.component';

describe('VolumeLicenseExportFromExcelComponent', () => {
  let component: VolumeLicenseExportFromExcelComponent;
  let fixture: ComponentFixture<VolumeLicenseExportFromExcelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeLicenseExportFromExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeLicenseExportFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
