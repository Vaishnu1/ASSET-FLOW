import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractDetailedReportComponent } from './contract-detailed-report.component';

describe('ContractDetailedReportComponent', () => {
  let component: ContractDetailedReportComponent;
  let fixture: ComponentFixture<ContractDetailedReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDetailedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
