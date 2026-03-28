import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetLoanHistoryComponent } from './asset-loan-history.component';

describe('AssetLoanHistoryComponent', () => {
  let component: AssetLoanHistoryComponent;
  let fixture: ComponentFixture<AssetLoanHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLoanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
