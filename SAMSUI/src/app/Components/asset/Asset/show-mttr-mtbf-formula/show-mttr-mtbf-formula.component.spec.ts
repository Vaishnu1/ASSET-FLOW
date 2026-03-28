import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMttrMtbfFormulaComponent } from './show-mttr-mtbf-formula.component';

describe('ShowMttrMtbfFormulaComponent', () => {
  let component: ShowMttrMtbfFormulaComponent;
  let fixture: ComponentFixture<ShowMttrMtbfFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMttrMtbfFormulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMttrMtbfFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
