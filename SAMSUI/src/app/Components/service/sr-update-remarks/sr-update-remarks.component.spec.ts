import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrUpdateRemarksComponent } from './sr-update-remarks.component';

describe('SrUpdateRemarksComponent', () => {
  let component: SrUpdateRemarksComponent;
  let fixture: ComponentFixture<SrUpdateRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrUpdateRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrUpdateRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
