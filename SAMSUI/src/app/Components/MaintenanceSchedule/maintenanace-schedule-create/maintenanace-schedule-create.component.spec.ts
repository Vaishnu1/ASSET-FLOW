import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanaceScheduleCreateComponent } from './maintenanace-schedule-create.component';

describe('MaintenanaceScheduleCreateComponent', () => {
  let component: MaintenanaceScheduleCreateComponent;
  let fixture: ComponentFixture<MaintenanaceScheduleCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanaceScheduleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanaceScheduleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
