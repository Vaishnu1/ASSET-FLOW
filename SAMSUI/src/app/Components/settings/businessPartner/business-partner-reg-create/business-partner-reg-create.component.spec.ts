import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerRegCreateComponent } from './business-partner-reg-create.component';

describe('BusinessPartnerRegCreateComponent', () => {
  let component: BusinessPartnerRegCreateComponent;
  let fixture: ComponentFixture<BusinessPartnerRegCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerRegCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerRegCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
