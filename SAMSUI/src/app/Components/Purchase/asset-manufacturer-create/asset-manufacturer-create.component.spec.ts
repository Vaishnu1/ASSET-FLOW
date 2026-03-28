import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetManufacturerCreateComponent } from './asset-manufacturer-create.component';

describe('AssetManufacturerCreateComponent', () => {
  let component: AssetManufacturerCreateComponent;
  let fixture: ComponentFixture<AssetManufacturerCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetManufacturerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetManufacturerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
