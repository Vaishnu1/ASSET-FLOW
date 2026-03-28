import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationPopupComponent } from './registration-popup.component';

describe('RegistrationPopupComponent', () => {
  let component: RegistrationPopupComponent;
  let fixture: ComponentFixture<RegistrationPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
