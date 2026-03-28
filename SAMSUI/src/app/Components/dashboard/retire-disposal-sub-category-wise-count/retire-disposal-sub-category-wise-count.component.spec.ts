import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetireDisposalSubCategoryWiseCountComponent } from './retire-disposal-sub-category-wise-count.component';

describe('RetireDisposalSubCategoryWiseCountComponent', () => {
  let component: RetireDisposalSubCategoryWiseCountComponent;
  let fixture: ComponentFixture<RetireDisposalSubCategoryWiseCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetireDisposalSubCategoryWiseCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetireDisposalSubCategoryWiseCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
