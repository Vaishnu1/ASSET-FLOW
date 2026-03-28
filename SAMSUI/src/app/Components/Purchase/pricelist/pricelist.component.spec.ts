import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricelistComponent } from './pricelist.component';

describe('PricelistComponent', () => {
  let component: PricelistComponent;
  let fixture: ComponentFixture<PricelistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
