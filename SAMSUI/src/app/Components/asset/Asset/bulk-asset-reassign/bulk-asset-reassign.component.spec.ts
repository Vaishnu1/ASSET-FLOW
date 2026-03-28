import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkAssetReassignComponent } from './bulk-asset-reassign.component';

describe('BulkAssetReassignComponent', () => {
  let component: BulkAssetReassignComponent;
  let fixture: ComponentFixture<BulkAssetReassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkAssetReassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkAssetReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
