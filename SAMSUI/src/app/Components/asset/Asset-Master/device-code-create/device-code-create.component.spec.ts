import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceCodeDialogComponent } from './device-code-create.component';

describe('DeviceCodeDialogComponent', () => {
  let component: DeviceCodeDialogComponent;
  let fixture: ComponentFixture<DeviceCodeDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
