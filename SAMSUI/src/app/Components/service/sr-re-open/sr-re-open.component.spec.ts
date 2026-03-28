import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrReOpenComponent } from './sr-re-open.component';

describe('SrReOpenComponent', () => {
  let component: SrReOpenComponent;
  let fixture: ComponentFixture<SrReOpenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrReOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrReOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
