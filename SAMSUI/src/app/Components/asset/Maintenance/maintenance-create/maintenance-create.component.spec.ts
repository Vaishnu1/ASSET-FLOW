import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceCreateComponent } from './maintenance-create.component';

describe('MaintenanceCreateComponent', () => {
  let component: MaintenanceCreateComponent;
  let fixture: ComponentFixture<MaintenanceCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
