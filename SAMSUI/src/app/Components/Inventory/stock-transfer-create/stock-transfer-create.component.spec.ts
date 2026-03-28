import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockTransferCreateComponent } from './stock-transfer-create.component';

describe('StockTransferCreateComponent', () => {
  let component: StockTransferCreateComponent;
  let fixture: ComponentFixture<StockTransferCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
