import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BreakDownAgingComponent } from './break-down-aging.component';

describe('BreakDownAgingComponent', () => {
  let component: BreakDownAgingComponent;
  let fixture: ComponentFixture<BreakDownAgingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakDownAgingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakDownAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
