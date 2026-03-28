import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BatchAssetListComponent } from './batch-asset-list.component';

describe('BatchAssetListComponent', () => {
  let component: BatchAssetListComponent;
  let fixture: ComponentFixture<BatchAssetListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
