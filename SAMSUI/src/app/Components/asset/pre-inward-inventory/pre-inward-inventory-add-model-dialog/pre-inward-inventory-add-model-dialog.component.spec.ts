import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreInwardInventoryAddModelDialogComponent } from './pre-inward-inventory-add-model-dialog.component';

describe('PreInwardInventoryAddModelDialogComponent', () => {
  let component: PreInwardInventoryAddModelDialogComponent;
  let fixture: ComponentFixture<PreInwardInventoryAddModelDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreInwardInventoryAddModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInwardInventoryAddModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
