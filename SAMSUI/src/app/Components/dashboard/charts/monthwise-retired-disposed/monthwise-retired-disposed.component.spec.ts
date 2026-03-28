import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthwiseRetiredDisposedComponent } from './monthwise-retired-disposed.component';

describe('MonthwiseRetiredDisposedComponent', () => {
  let component: MonthwiseRetiredDisposedComponent;
  let fixture: ComponentFixture<MonthwiseRetiredDisposedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthwiseRetiredDisposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthwiseRetiredDisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
