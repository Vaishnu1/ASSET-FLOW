import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestTrainingComponent } from './service-request-training.component';

describe('ServiceRequestTrainingComponent', () => {
  let component: ServiceRequestTrainingComponent;
  let fixture: ComponentFixture<ServiceRequestTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
