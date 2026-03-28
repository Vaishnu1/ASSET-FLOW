import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrWithOutPrCountComponent } from './sr-with-out-pr-count.component';

describe('SrWithOutPrCountComponent', () => {
  let component: SrWithOutPrCountComponent;
  let fixture: ComponentFixture<SrWithOutPrCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrWithOutPrCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrWithOutPrCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
