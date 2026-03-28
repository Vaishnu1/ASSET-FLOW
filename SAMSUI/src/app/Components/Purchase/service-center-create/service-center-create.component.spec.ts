import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceCenterCreateComponent } from './service-center-create.component';

describe('ServiceCenterCreateComponent', () => {
  let component: ServiceCenterCreateComponent;
  let fixture: ComponentFixture<ServiceCenterCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCenterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
