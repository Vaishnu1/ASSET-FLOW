import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyCodeListComponent } from './currency-code-list.component';


describe('CurrencyCodeListComponent', () => {
  let component: CurrencyCodeListComponent;
  let fixture: ComponentFixture<CurrencyCodeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyCodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
