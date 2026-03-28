import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatePassListComponent } from './gate-pass-list.component';

describe('GatePassListComponent', () => {
  let component: GatePassListComponent;
  let fixture: ComponentFixture<GatePassListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GatePassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatePassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
