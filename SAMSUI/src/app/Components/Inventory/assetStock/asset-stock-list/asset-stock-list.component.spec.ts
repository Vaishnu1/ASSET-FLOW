import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetStockListComponent } from './asset-stock-list.component';

describe('AssetStockListComponent', () => {
  let component: AssetStockListComponent;
  let fixture: ComponentFixture<AssetStockListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
