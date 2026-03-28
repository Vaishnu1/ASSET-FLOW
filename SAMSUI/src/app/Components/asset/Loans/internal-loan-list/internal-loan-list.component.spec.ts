import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InternalLoanListComponent } from './internal-loan-list.component';

describe('InternalLoanListComponent', () => {
  let component: InternalLoanListComponent;
  let fixture: ComponentFixture<InternalLoanListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLoanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
