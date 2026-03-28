import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurhcaseTermsMainComponent } from './purhcase-terms-main.component';

describe('PurhcaseTermsMainComponent', () => {
  let component: PurhcaseTermsMainComponent;
  let fixture: ComponentFixture<PurhcaseTermsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurhcaseTermsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurhcaseTermsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
