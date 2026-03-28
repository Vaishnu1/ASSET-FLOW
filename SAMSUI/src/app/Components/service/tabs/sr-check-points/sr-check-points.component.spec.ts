import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrCheckPointsComponent } from './sr-check-points.component';

describe('SrCheckPointsComponent', () => {
  let component: SrCheckPointsComponent;
  let fixture: ComponentFixture<SrCheckPointsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrCheckPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrCheckPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
