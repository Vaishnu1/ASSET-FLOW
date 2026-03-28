import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComparisonBm3monthsComponent } from './comparison-bm3months.component';

describe('ComparisonBm3monthsComponent', () => {
  let component: ComparisonBm3monthsComponent;
  let fixture: ComponentFixture<ComparisonBm3monthsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonBm3monthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonBm3monthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
