import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildingSegmentCreateComponent } from './building-segment-create.component';

describe('BuildingSegmentCreateComponent', () => {
  let component: BuildingSegmentCreateComponent;
  let fixture: ComponentFixture<BuildingSegmentCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingSegmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingSegmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
