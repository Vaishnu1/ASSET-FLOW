import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceScheduleAssetWiseComponent } from './maintenance-schedule-asset-wise.component';

describe('MaintenanceScheduleAssetWiseComponent', () => {
  let component: MaintenanceScheduleAssetWiseComponent;
  let fixture: ComponentFixture<MaintenanceScheduleAssetWiseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceScheduleAssetWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceScheduleAssetWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
