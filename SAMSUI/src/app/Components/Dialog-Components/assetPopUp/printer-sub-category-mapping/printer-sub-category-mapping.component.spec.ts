import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrinterSubCategoryMappingComponent } from './printer-sub-category-mapping.component';

describe('PrinterSubCategoryMappingComponent', () => {
  let component: PrinterSubCategoryMappingComponent;
  let fixture: ComponentFixture<PrinterSubCategoryMappingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSubCategoryMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterSubCategoryMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
