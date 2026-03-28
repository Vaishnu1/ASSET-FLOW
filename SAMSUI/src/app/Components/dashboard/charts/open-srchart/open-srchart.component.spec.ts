import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpenSRChartComponent } from './open-srchart.component';

describe('OpenSRChartComponent', () => {
  let component: OpenSRChartComponent;
  let fixture: ComponentFixture<OpenSRChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSRChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSRChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
