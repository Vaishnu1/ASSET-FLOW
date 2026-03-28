import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RentalLeaseDetailsComponent } from './rental-lease-details.component';

describe('RentalLeaseDetailsComponent', () => {
  let component: RentalLeaseDetailsComponent;
  let fixture: ComponentFixture<RentalLeaseDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalLeaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalLeaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
