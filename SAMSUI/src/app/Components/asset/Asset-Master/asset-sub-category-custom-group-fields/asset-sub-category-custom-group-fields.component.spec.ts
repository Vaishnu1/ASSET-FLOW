import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetSubCategoryCustomGroupFieldsComponent } from './asset-sub-category-custom-group-fields.component';

describe('AssetSubCategoryCustomGroupFieldsComponent', () => {
  let component: AssetSubCategoryCustomGroupFieldsComponent;
  let fixture: ComponentFixture<AssetSubCategoryCustomGroupFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubCategoryCustomGroupFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubCategoryCustomGroupFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
