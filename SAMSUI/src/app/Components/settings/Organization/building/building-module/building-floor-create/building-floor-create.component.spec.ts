import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildingFloorCreateComponent } from './building-floor-create.component';

describe('BuildingFloorCreateComponent', () => {
  let component: BuildingFloorCreateComponent;
  let fixture: ComponentFixture<BuildingFloorCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingFloorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingFloorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
