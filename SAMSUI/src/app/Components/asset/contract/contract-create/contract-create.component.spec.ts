import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractCreateComponent } from './contract-create.component';

describe('ContractAddComponent', () => {
  let component: ContractCreateComponent;
  let fixture: ComponentFixture<ContractCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
