import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestAssetRetirementComponent } from './service-request-asset-retirement.component';

describe('ServiceRequestAssetRetirementComponent', () => {
  let component: ServiceRequestAssetRetirementComponent;
  let fixture: ComponentFixture<ServiceRequestAssetRetirementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestAssetRetirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestAssetRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
