import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetDetailPopUpComponent } from './budget-detail-pop-up.component';

describe('BudgetDetailPopUpComponent', () => {
  let component: BudgetDetailPopUpComponent;
  let fixture: ComponentFixture<BudgetDetailPopUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetDetailPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
