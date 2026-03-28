import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceScheduleListComponent } from './maintenance-schedule-list.component';

describe('MaintenanceScheduleListComponent', () => {
  let component: MaintenanceScheduleListComponent;
  let fixture: ComponentFixture<MaintenanceScheduleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
