import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegionWiseServicerequestComponent } from './region-wise-servicerequest.component';

describe('RegionWiseServicerequestComponent', () => {
  let component: RegionWiseServicerequestComponent;
  let fixture: ComponentFixture<RegionWiseServicerequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionWiseServicerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionWiseServicerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
