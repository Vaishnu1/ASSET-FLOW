import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainV2Component } from './dashboard-main-v2.component';

describe('DashboardMainV2Component', () => {
  let component: DashboardMainV2Component;
  let fixture: ComponentFixture<DashboardMainV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMainV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
