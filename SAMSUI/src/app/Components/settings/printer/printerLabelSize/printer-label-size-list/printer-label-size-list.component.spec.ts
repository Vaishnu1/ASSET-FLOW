import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterLabelSizeListComponent } from './printer-label-size-list.component';

describe('PrinterLabelSizeListComponent', () => {
  let component: PrinterLabelSizeListComponent;
  let fixture: ComponentFixture<PrinterLabelSizeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterLabelSizeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterLabelSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
