import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterTemplateListComponent } from './printer-template-list.component';

describe('PrinterTemplateListComponent', () => {
  let component: PrinterTemplateListComponent;
  let fixture: ComponentFixture<PrinterTemplateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
