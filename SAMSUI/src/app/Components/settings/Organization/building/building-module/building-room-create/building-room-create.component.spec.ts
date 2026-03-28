import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildingRoomCreateComponent } from './building-room-create.component';

describe('BuildingRoomCreateComponent', () => {
  let component: BuildingRoomCreateComponent;
  let fixture: ComponentFixture<BuildingRoomCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingRoomCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingRoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
