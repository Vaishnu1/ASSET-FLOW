import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestListPaComponent } from './service-request-list-pa.component';

describe('ServiceRequestListPaComponent', () => {
  let component: ServiceRequestListPaComponent;
  let fixture: ComponentFixture<ServiceRequestListPaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestListPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestListPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
