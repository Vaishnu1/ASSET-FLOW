import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApproveConfirmationComponent } from './update-approve-confirmation.component';

describe('UpdateApproveConfirmationComponent', () => {
  let component: UpdateApproveConfirmationComponent;
  let fixture: ComponentFixture<UpdateApproveConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateApproveConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApproveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
