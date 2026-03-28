import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetStockCreateComponent } from './asset-stock-create.component';

describe('AssetStockCreateComponent', () => {
  let component: AssetStockCreateComponent;
  let fixture: ComponentFixture<AssetStockCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetStockCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
