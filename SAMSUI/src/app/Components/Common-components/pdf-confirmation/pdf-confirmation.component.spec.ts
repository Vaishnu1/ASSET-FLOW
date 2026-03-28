import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConfirmationComponent } from './pdf-confirmation.component';

describe('PdfConfirmationComponent', () => {
  let component: PdfConfirmationComponent;
  let fixture: ComponentFixture<PdfConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
