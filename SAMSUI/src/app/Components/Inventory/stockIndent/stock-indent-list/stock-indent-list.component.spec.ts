import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockIndentListComponent } from './stock-indent-list.component';

describe('StockIndentListComponent', () => {
  let component: StockIndentListComponent;
  let fixture: ComponentFixture<StockIndentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIndentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
