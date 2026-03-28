import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractInfoComponent } from './add-contract-info.component';

describe('AddContractInfoComponent', () => {
  let component: AddContractInfoComponent;
  let fixture: ComponentFixture<AddContractInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
