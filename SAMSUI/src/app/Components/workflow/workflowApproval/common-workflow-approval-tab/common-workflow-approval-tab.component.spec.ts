import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonWorkflowApprovalTabComponent } from './common-workflow-approval-tab.component';

describe('CommonWorkflowApprovalTabComponent', () => {
  let component: CommonWorkflowApprovalTabComponent;
  let fixture: ComponentFixture<CommonWorkflowApprovalTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonWorkflowApprovalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonWorkflowApprovalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
