import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractDocCreateComponent } from './contract-doc-create.component';

describe('ContractDocCreateComponent', () => {
  let component: ContractDocCreateComponent;
  let fixture: ComponentFixture<ContractDocCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDocCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
