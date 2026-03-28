import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetSubCategoryCustomFieldsComponent } from './asset-sub-category-custom-fields.component';

describe('AssetSubCategoryCustomFieldsComponent', () => {
  let component: AssetSubCategoryCustomFieldsComponent;
  let fixture: ComponentFixture<AssetSubCategoryCustomFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubCategoryCustomFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubCategoryCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
