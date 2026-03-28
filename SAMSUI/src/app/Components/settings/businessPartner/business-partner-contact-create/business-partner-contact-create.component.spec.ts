import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerContactCreateComponent } from './business-partner-contact-create.component';

describe('BusinessPartnerContactCreateComponent', () => {
  let component: BusinessPartnerContactCreateComponent;
  let fixture: ComponentFixture<BusinessPartnerContactCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerContactCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerContactCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
