import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestHandOverComponent } from './service-request-hand-over.component';

describe('ServiceRequestHandOverComponent', () => {
  let component: ServiceRequestHandOverComponent;
  let fixture: ComponentFixture<ServiceRequestHandOverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestHandOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestHandOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
