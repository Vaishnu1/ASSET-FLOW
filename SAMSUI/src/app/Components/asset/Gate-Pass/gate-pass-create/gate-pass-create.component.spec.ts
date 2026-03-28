import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatePassCreateComponent } from './gate-pass-create.component';

describe('GatePassCreateComponent', () => {
  let component: GatePassCreateComponent;
  let fixture: ComponentFixture<GatePassCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GatePassCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatePassCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
