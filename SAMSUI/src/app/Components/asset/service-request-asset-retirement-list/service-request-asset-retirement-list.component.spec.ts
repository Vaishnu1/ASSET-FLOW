import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRequestAssetRetirementListComponent } from './service-request-asset-retirement-list.component';

describe('ServiceRequestAssetRetirementListComponent', () => {
  let component: ServiceRequestAssetRetirementListComponent;
  let fixture: ComponentFixture<ServiceRequestAssetRetirementListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestAssetRetirementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestAssetRetirementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
