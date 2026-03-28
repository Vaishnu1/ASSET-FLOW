import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainV1Component } from './dashboard-main-v1.component';

describe('DashboardMainV1Component', () => {
  let component: DashboardMainV1Component;
  let fixture: ComponentFixture<DashboardMainV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMainV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
