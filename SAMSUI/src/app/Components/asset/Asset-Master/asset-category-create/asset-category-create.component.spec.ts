import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetCategoryCreateComponent } from './asset-category-create.component';

describe('AssetCategoryCreateComponent', () => {
  let component: AssetCategoryCreateComponent;
  let fixture: ComponentFixture<AssetCategoryCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
