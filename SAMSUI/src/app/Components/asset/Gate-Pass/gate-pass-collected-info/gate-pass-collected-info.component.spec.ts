import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatePassCollectedInfoComponent } from './gate-pass-collected-info.component';

describe('GatePassCollectedInfoComponent', () => {
  let component: GatePassCollectedInfoComponent;
  let fixture: ComponentFixture<GatePassCollectedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatePassCollectedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatePassCollectedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
