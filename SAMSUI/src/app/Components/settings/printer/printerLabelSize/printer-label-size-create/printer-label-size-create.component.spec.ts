import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterLabelSizeCreateComponent } from './printer-label-size-create.component';

describe('PrinterLabelSizeCreateComponent', () => {
  let component: PrinterLabelSizeCreateComponent;
  let fixture: ComponentFixture<PrinterLabelSizeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterLabelSizeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterLabelSizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
