import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceAddAssetScheduleComponent } from './maintenance-add-asset-schedule.component';

describe('MaintenanceAddAssetScheduleComponent', () => {
  let component: MaintenanceAddAssetScheduleComponent;
  let fixture: ComponentFixture<MaintenanceAddAssetScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceAddAssetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceAddAssetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
