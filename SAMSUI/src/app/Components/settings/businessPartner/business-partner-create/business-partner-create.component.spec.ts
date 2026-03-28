import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerCreateComponent } from './business-partner-create.component';

describe('BusinessPartnerCreateComponent', () => {
  let component: BusinessPartnerCreateComponent;
  let fixture: ComponentFixture<BusinessPartnerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
