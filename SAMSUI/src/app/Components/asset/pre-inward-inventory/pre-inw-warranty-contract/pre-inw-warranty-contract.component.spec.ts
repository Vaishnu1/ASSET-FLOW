import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreInwWarrantyContractComponent } from './pre-inw-warranty-contract.component';

describe('PreInwWarrantyContractComponent', () => {
  let component: PreInwWarrantyContractComponent;
  let fixture: ComponentFixture<PreInwWarrantyContractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreInwWarrantyContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInwWarrantyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
