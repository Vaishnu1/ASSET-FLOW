import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWorkflowApprovalDialogComponent } from './common-workflow-approval-dialog.component';

describe('CommonWorkflowApprovalDialogComponent', () => {
  let component: CommonWorkflowApprovalDialogComponent;
  let fixture: ComponentFixture<CommonWorkflowApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonWorkflowApprovalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonWorkflowApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
