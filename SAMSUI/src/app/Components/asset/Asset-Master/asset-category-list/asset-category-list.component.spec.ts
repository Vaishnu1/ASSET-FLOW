import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetCategoryListComponent } from './asset-category-list.component';

describe('AssetCategoryListComponent', () => {
  let component: AssetCategoryListComponent;
  let fixture: ComponentFixture<AssetCategoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
