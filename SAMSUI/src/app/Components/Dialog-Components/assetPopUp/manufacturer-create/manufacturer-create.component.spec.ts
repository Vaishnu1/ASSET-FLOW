import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManufacturerCreateComponent } from './manufacturer-create.component';

describe('ManufacturerCreateComponent', () => {
  let component: ManufacturerCreateComponent;
  let fixture: ComponentFixture<ManufacturerCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
