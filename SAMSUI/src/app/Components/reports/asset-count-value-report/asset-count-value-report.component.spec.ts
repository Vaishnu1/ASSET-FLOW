import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetCountValueReportComponent } from './asset-count-value-report.component';

describe('AssetCountValueReportComponent', () => {
  let component: AssetCountValueReportComponent;
  let fixture: ComponentFixture<AssetCountValueReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCountValueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCountValueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
