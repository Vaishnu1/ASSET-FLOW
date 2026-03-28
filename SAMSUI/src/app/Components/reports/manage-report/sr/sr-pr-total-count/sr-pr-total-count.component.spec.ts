import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPrTotalCountComponent } from './sr-pr-total-count.component';

describe('SrPrTotalCountComponent', () => {
  let component: SrPrTotalCountComponent;
  let fixture: ComponentFixture<SrPrTotalCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPrTotalCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPrTotalCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
