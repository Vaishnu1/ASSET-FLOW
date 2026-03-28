import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterCreateComponent } from './printer-create.component';

describe('PrinterCreateComponent', () => {
  let component: PrinterCreateComponent;
  let fixture: ComponentFixture<PrinterCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
