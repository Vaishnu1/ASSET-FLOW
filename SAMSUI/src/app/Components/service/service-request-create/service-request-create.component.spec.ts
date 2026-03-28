import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestCreateComponent } from './service-request-create.component';

describe('ServiceRequestCreateComponent', () => {
  let component: ServiceRequestCreateComponent;
  let fixture: ComponentFixture<ServiceRequestCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
