import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipmentUtilizationComponent } from './equipment-utilization.component';

describe('EquipmentUtilizationComponent', () => {
  let component: EquipmentUtilizationComponent;
  let fixture: ComponentFixture<EquipmentUtilizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
