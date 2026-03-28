import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierSiteCreateComponent } from './supplier-site-create.component';

describe('SupplierSiteCreateComponent', () => {
  let component: SupplierSiteCreateComponent;
  let fixture: ComponentFixture<SupplierSiteCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSiteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
