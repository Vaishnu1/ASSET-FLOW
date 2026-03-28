import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WarrantyExpiringComponent } from './warranty-expiring.component';

describe('WarrantyExpiringComponent', () => {
  let component: WarrantyExpiringComponent;
  let fixture: ComponentFixture<WarrantyExpiringComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyExpiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyExpiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
