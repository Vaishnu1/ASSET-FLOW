import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowApprovalListComponent } from './workflow-approval-list.component';

describe('WorkflowApprovalListComponent', () => {
  let component: WorkflowApprovalListComponent;
  let fixture: ComponentFixture<WorkflowApprovalListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
