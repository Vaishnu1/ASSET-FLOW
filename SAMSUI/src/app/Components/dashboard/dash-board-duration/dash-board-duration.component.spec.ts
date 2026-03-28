import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashBoardDurationComponent } from './dash-board-duration.component';

describe('DashBoardDurationComponent', () => {
  let component: DashBoardDurationComponent;
  let fixture: ComponentFixture<DashBoardDurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
