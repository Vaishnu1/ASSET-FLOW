import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemApprovedSupplierComponent } from './item-approved-supplier.component';

describe('ItemApprovedSupplierComponent', () => {
  let component: ItemApprovedSupplierComponent;
  let fixture: ComponentFixture<ItemApprovedSupplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemApprovedSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemApprovedSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
