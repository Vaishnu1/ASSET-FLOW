import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpenSRCriticalityComponent } from './open-srcriticality.component';

describe('OpenSRCriticalityComponent', () => {
  let component: OpenSRCriticalityComponent;
  let fixture: ComponentFixture<OpenSRCriticalityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSRCriticalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSRCriticalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
