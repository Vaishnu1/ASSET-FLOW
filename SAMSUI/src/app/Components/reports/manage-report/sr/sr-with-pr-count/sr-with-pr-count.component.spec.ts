import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrWithPrCountComponent } from './sr-with-pr-count.component';

describe('SrWithPrCountComponent', () => {
  let component: SrWithPrCountComponent;
  let fixture: ComponentFixture<SrWithPrCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrWithPrCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrWithPrCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
