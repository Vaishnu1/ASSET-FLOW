import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrActivityServiceCostComponent } from './sr-activity-service-cost.component';

describe('SrActivityServiceCostComponent', () => {
  let component: SrActivityServiceCostComponent;
  let fixture: ComponentFixture<SrActivityServiceCostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrActivityServiceCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrActivityServiceCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
