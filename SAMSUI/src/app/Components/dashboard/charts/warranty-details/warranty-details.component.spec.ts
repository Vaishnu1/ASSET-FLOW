import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WarrantyDetailsComponent } from './warranty-details.component';

describe('WarrantyDetailsComponent', () => {
  let component: WarrantyDetailsComponent;
  let fixture: ComponentFixture<WarrantyDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
