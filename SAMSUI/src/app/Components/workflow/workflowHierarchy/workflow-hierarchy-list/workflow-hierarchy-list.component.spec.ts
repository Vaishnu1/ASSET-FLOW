import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowHierarchyListComponent } from './workflow-hierarchy-list.component';

describe('WorkflowHierarchyListComponent', () => {
  let component: WorkflowHierarchyListComponent;
  let fixture: ComponentFixture<WorkflowHierarchyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowHierarchyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowHierarchyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
