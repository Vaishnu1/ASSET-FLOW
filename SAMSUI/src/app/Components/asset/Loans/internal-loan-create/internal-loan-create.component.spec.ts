import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InternalLoanCreateComponent } from './internal-loan-create.component';

describe('InternalLoanCreateComponent', () => {
  let component: InternalLoanCreateComponent;
  let fixture: ComponentFixture<InternalLoanCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLoanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLoanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
