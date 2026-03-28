import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubcategoryWiseAssetInfoComponent } from './subcategory-wise-asset-info.component';

describe('SubcategoryWiseAssetInfoComponent', () => {
  let component: SubcategoryWiseAssetInfoComponent;
  let fixture: ComponentFixture<SubcategoryWiseAssetInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryWiseAssetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryWiseAssetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
