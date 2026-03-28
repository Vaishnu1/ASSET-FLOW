import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelDetailedReportComponent } from './model-detailed-report.component';

describe('ModelDetailedReportComponent', () => {
  let component: ModelDetailedReportComponent;
  let fixture: ComponentFixture<ModelDetailedReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDetailedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
