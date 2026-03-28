import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricelistViewComponent } from './pricelist-view.component';

describe('PricelistViewComponent', () => {
  let component: PricelistViewComponent;
  let fixture: ComponentFixture<PricelistViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
