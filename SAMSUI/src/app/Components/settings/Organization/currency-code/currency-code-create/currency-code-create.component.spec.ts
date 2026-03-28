import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrencyCodeCreateComponent } from './currency-code-create.component';

describe('CurrencyCodeCreateComponent', () => {
  let component: CurrencyCodeCreateComponent;
  let fixture: ComponentFixture<CurrencyCodeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyCodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
