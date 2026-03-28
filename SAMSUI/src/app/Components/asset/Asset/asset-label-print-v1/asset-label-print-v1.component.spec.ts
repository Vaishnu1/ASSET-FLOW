import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLabelPrintV1Component } from './asset-label-print-v1.component';

describe('AssetLabelPrintV1Component', () => {
  let component: AssetLabelPrintV1Component;
  let fixture: ComponentFixture<AssetLabelPrintV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLabelPrintV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLabelPrintV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
