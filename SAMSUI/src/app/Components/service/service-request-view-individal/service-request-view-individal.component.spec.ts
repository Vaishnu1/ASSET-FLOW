import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestViewIndividalComponent } from './service-request-view-individal.component';

describe('ServiceRequestViewIndividalComponent', () => {
  let component: ServiceRequestViewIndividalComponent;
  let fixture: ComponentFixture<ServiceRequestViewIndividalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestViewIndividalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestViewIndividalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
