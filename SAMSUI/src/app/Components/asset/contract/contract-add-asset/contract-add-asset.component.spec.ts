import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractAddAssetComponent } from './contract-add-asset.component';

describe('ContractAddAssetComponent', () => {
  let component: ContractAddAssetComponent;
  let fixture: ComponentFixture<ContractAddAssetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAddAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAddAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
