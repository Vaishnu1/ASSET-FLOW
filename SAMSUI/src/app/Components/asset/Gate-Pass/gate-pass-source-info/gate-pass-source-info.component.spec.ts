import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatePassSourceInfoComponent } from './gate-pass-source-info.component';

describe('GatePassSourceInfoComponent', () => {
  let component: GatePassSourceInfoComponent;
  let fixture: ComponentFixture<GatePassSourceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatePassSourceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatePassSourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
