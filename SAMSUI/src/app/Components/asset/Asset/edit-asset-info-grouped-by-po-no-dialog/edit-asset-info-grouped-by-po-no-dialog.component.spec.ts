import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditAssetInfoGroupedByPoNoDialogComponent } from './edit-asset-info-grouped-by-po-no-dialog.component';

describe('EditAssetInfoGroupedByPoNoDialogComponent', () => {
  let component: EditAssetInfoGroupedByPoNoDialogComponent;
  let fixture: ComponentFixture<EditAssetInfoGroupedByPoNoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssetInfoGroupedByPoNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssetInfoGroupedByPoNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
