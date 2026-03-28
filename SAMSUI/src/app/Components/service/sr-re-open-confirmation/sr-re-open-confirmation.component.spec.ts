import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrReOpenConfirmationComponent } from './sr-re-open-confirmation.component';

describe('SrReOpenConfirmationComponent', () => {
  let component: SrReOpenConfirmationComponent;
  let fixture: ComponentFixture<SrReOpenConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrReOpenConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrReOpenConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
