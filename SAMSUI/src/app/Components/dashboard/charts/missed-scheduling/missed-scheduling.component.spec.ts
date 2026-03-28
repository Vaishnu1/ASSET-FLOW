import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MissedSchedulingComponent } from './missed-scheduling.component';

describe('MissedSchedulingComponent', () => {
  let component: MissedSchedulingComponent;
  let fixture: ComponentFixture<MissedSchedulingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MissedSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
