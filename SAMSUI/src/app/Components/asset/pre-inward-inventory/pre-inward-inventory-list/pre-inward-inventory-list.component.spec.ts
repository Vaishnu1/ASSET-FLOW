import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreInwardInventoryListComponent } from './pre-inward-inventory-list.component';

describe('PreInwardInventoryListComponent', () => {
  let component: PreInwardInventoryListComponent;
  let fixture: ComponentFixture<PreInwardInventoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreInwardInventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInwardInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
