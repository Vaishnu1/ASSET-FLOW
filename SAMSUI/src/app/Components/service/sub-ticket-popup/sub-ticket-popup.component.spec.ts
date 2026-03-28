import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubTicketPopupComponent } from './sub-ticket-popup.component';

describe('SubTicketPopupComponent', () => {
  let component: SubTicketPopupComponent;
  let fixture: ComponentFixture<SubTicketPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTicketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
