import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrPrSearchComponent } from './sr-pr-search.component';

describe('SrPrSearchComponent', () => {
  let component: SrPrSearchComponent;
  let fixture: ComponentFixture<SrPrSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrPrSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrPrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
