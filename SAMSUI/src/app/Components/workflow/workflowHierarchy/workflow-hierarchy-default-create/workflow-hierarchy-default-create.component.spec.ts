import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowHierarchyDefaultCreateComponent } from './workflow-hierarchy-default-create.component';

describe('WorkflowHierarchyDefaultCreateComponent', () => {
  let component: WorkflowHierarchyDefaultCreateComponent;
  let fixture: ComponentFixture<WorkflowHierarchyDefaultCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowHierarchyDefaultCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowHierarchyDefaultCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
