import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierSiteContactCreateComponent } from './supplier-site-contact-create.component';

describe('SupplierSiteContactCreateComponent', () => {
  let component: SupplierSiteContactCreateComponent;
  let fixture: ComponentFixture<SupplierSiteContactCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSiteContactCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSiteContactCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
