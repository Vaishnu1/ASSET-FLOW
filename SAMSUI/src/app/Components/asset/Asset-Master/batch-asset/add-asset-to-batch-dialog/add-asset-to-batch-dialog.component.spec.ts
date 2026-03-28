import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAssetToBatchDialogComponent } from './add-asset-to-batch-dialog.component';

describe('AddAssetToBatchDialogComponent', () => {
  let component: AddAssetToBatchDialogComponent;
  let fixture: ComponentFixture<AddAssetToBatchDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetToBatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetToBatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
