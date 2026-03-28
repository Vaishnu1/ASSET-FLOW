import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestReassignComponent } from './service-request-reassign.component';

describe('ServiceRequestReassignComponent', () => {
  let component: ServiceRequestReassignComponent;
  let fixture: ComponentFixture<ServiceRequestReassignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestReassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
