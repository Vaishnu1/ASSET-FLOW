import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierSiteRegistrationComponent } from './supplier-site-registration.component';

describe('SupplierSiteRegistrationComponent', () => {
  let component: SupplierSiteRegistrationComponent;
  let fixture: ComponentFixture<SupplierSiteRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSiteRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSiteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
