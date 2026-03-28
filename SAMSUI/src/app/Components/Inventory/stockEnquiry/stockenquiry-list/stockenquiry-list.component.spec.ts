import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockenquiryListComponent } from './stockenquiry-list.component';

describe('StockenquiryListComponent', () => {
  let component: StockenquiryListComponent;
  let fixture: ComponentFixture<StockenquiryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockenquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockenquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
