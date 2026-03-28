import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetManufacturerComponent } from './asset-manufacturer.component';

describe('AssetManufacturerComponent', () => {
  let component: AssetManufacturerComponent;
  let fixture: ComponentFixture<AssetManufacturerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
