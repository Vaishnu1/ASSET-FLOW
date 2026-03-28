import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestListQaComponent } from './service-request-list-qa.component';

describe('ServiceRequestListQaComponent', () => {
  let component: ServiceRequestListQaComponent;
  let fixture: ComponentFixture<ServiceRequestListQaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestListQaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestListQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
