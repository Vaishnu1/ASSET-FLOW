import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPdfConfirmationDialogComponent } from './sr-pdf-confirmation-dialog.component';

describe('SrPdfConfirmationDialogComponent', () => {
  let component: SrPdfConfirmationDialogComponent;
  let fixture: ComponentFixture<SrPdfConfirmationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPdfConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPdfConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
