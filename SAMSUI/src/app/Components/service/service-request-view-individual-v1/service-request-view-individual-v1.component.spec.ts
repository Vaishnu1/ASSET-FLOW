import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestViewIndividualV1Component } from './service-request-view-individual-v1.component';

describe('ServiceRequestViewIndividualV1Component', () => {
  let component: ServiceRequestViewIndividualV1Component;
  let fixture: ComponentFixture<ServiceRequestViewIndividualV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestViewIndividualV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestViewIndividualV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
