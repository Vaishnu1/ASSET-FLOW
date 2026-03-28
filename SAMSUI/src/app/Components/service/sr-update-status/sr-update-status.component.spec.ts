import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrUpdateStatusComponent } from './sr-update-status.component';

describe('SrUpdateStatusComponent', () => {
  let component: SrUpdateStatusComponent;
  let fixture: ComponentFixture<SrUpdateStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrUpdateStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
