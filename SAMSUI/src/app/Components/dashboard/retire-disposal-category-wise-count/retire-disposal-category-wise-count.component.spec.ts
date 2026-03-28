import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetireDisposalCategoryWiseCountComponent } from './retire-disposal-category-wise-count.component';

describe('RetireDisposalCategoryWiseCountComponent', () => {
  let component: RetireDisposalCategoryWiseCountComponent;
  let fixture: ComponentFixture<RetireDisposalCategoryWiseCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetireDisposalCategoryWiseCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetireDisposalCategoryWiseCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
