import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryWiseAssetInfoComponent } from './category-wise-asset-info.component';

describe('CategoryWiseAssetInfoComponent', () => {
  let component: CategoryWiseAssetInfoComponent;
  let fixture: ComponentFixture<CategoryWiseAssetInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseAssetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseAssetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
