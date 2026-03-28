import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBySubCategoryV2Component } from './asset-by-sub-category-v2.component';

describe('AssetBySubCategoryV2Component', () => {
  let component: AssetBySubCategoryV2Component;
  let fixture: ComponentFixture<AssetBySubCategoryV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBySubCategoryV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBySubCategoryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
