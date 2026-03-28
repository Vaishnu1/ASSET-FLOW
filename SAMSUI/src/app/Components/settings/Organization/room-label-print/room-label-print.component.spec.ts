import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLabelPrintComponent } from './room-label-print.component';

describe('RoomLabelPrintComponent', () => {
  let component: RoomLabelPrintComponent;
  let fixture: ComponentFixture<RoomLabelPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomLabelPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLabelPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
