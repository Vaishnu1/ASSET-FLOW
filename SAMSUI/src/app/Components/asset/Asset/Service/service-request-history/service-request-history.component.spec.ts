import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestHistoryComponent } from './service-request-history.component';

describe('ServiceRequestHistoryComponent', () => {
  let component: ServiceRequestHistoryComponent;
  let fixture: ComponentFixture<ServiceRequestHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
