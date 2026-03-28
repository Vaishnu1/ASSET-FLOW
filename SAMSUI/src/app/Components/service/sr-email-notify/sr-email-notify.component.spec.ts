import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrEmailNotifyComponent } from './sr-email-notify.component';

describe('SrEmailNotifyComponent', () => {
  let component: SrEmailNotifyComponent;
  let fixture: ComponentFixture<SrEmailNotifyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrEmailNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrEmailNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
