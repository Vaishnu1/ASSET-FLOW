import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreInwardInventoryCreateComponent } from './pre-inward-inventory-create.component';

describe('PreInwardInventoryCreateComponent', () => {
  let component: PreInwardInventoryCreateComponent;
  let fixture: ComponentFixture<PreInwardInventoryCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreInwardInventoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInwardInventoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
