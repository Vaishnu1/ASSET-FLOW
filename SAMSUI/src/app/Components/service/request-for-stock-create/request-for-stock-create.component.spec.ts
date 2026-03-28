import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestForStockCreateComponent } from './request-for-stock-create.component';

describe('RequestForStockCreateComponent', () => {
  let component: RequestForStockCreateComponent;
  let fixture: ComponentFixture<RequestForStockCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForStockCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForStockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
