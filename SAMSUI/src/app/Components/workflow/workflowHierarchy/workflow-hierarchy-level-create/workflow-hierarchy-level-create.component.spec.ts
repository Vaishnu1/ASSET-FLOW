import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowHierarchyLevelCreateComponent } from './workflow-hierarchy-level-create.component';

describe('WorkflowHierarchyLevelCreateComponent', () => {
  let component: WorkflowHierarchyLevelCreateComponent;
  let fixture: ComponentFixture<WorkflowHierarchyLevelCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowHierarchyLevelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowHierarchyLevelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
