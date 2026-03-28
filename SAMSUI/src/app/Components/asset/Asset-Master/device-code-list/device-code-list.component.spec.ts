import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceCodeComponent } from './device-code-list.component';

describe('DeviceCodeComponent', () => {
  let component: DeviceCodeComponent;
  let fixture: ComponentFixture<DeviceCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
