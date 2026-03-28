import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttrAndMtbfReportComponent } from './mttr-and-mtbf-report.component';

describe('MttrAndMtbfReportComponent', () => {
  let component: MttrAndMtbfReportComponent;
  let fixture: ComponentFixture<MttrAndMtbfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttrAndMtbfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttrAndMtbfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
