import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricelistCreateComponent } from './pricelist-create.component';

describe('PricelistCreateComponent', () => {
  let component: PricelistCreateComponent;
  let fixture: ComponentFixture<PricelistCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelistCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
