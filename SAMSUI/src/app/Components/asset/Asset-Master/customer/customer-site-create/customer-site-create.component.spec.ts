import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerSiteCreateComponent } from './customer-site-create.component';

describe('CustomerSiteCreateComponent', () => {
  let component: CustomerSiteCreateComponent;
  let fixture: ComponentFixture<CustomerSiteCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
