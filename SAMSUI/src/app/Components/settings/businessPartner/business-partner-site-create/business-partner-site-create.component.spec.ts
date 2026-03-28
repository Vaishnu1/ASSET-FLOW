import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerSiteCreateComponent } from './business-partner-site-create.component';

describe('BusinessPartnerSiteCreateComponent', () => {
  let component: BusinessPartnerSiteCreateComponent;
  let fixture: ComponentFixture<BusinessPartnerSiteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerSiteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerSiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
