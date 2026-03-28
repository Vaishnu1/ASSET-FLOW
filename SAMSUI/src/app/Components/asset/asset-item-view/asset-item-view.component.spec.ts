import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetItemViewComponent } from './asset-item-view.component';

describe('AssetItemViewComponent', () => {
  let component: AssetItemViewComponent;
  let fixture: ComponentFixture<AssetItemViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
