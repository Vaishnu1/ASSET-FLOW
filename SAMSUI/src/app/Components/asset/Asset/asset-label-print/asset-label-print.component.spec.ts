import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetLabelPrintComponent } from './asset-label-print.component';

describe('AssetLabelPrintComponent', () => {
  let component: AssetLabelPrintComponent;
  let fixture: ComponentFixture<AssetLabelPrintComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLabelPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLabelPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
