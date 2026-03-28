import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockIndentCreateComponent } from './stock-indent-create.component';

describe('StockIndentCreateComponent', () => {
  let component: StockIndentCreateComponent;
  let fixture: ComponentFixture<StockIndentCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIndentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
