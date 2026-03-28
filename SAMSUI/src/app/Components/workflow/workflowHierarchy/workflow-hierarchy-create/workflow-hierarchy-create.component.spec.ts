import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowHierarchyCreateComponent } from './workflow-hierarchy-create.component';

describe('WorkflowHierarchyCreateComponent', () => {
  let component: WorkflowHierarchyCreateComponent;
  let fixture: ComponentFixture<WorkflowHierarchyCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowHierarchyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowHierarchyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
