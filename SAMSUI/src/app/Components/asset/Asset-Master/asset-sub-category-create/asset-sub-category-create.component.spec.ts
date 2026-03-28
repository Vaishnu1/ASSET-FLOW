import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetSubCategoryCreateComponent } from './asset-sub-category-create.component';

describe('AssetSubCategoryCreateComponent', () => {
  let component: AssetSubCategoryCreateComponent;
  let fixture: ComponentFixture<AssetSubCategoryCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
