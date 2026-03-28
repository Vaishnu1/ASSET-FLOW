import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetSubCategoryListComponent } from './asset-sub-category-list.component';

describe('AssetSubCategoryListComponent', () => {
  let component: AssetSubCategoryListComponent;
  let fixture: ComponentFixture<AssetSubCategoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
