import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildingBlockCreateComponent } from './building-block-create.component';

describe('BuildingBlockCreateComponent', () => {
  let component: BuildingBlockCreateComponent;
  let fixture: ComponentFixture<BuildingBlockCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBlockCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBlockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
