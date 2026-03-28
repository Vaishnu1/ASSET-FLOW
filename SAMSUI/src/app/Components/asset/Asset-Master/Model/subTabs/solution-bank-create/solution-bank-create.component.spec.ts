import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SolutionBankCreateComponent } from './solution-bank-create.component';

describe('SolutionBankCreateComponent', () => {
  let component: SolutionBankCreateComponent;
  let fixture: ComponentFixture<SolutionBankCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionBankCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionBankCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
