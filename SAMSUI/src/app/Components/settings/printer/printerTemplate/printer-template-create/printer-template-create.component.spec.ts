import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterTemplateCreateComponent } from './printer-template-create.component';

describe('PrinterTemplateCreateComponent', () => {
  let component: PrinterTemplateCreateComponent;
  let fixture: ComponentFixture<PrinterTemplateCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
