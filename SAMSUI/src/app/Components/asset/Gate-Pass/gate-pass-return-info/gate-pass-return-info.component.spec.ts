import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatePassReturnInfoComponent } from './gate-pass-return-info.component';

describe('GatePassReturnInfoComponent', () => {
  let component: GatePassReturnInfoComponent;
  let fixture: ComponentFixture<GatePassReturnInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GatePassReturnInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatePassReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
