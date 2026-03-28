import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractPeriodCreateComponent } from './contract-period-create.component';

describe('ContractPeriodCreateComponent', () => {
  let component: ContractPeriodCreateComponent;
  let fixture: ComponentFixture<ContractPeriodCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPeriodCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPeriodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
