import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestListPMComponent } from './service-request-list-pm.component';

describe('ServiceRequestListPMComponent', () => {
  let component: ServiceRequestListPMComponent;
  let fixture: ComponentFixture<ServiceRequestListPMComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestListPMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestListPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
