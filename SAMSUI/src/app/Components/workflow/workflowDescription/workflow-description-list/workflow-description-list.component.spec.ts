import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowDescriptionListComponent } from './workflow-description-list.component';

describe('WorkflowDescriptionListComponent', () => {
  let component: WorkflowDescriptionListComponent;
  let fixture: ComponentFixture<WorkflowDescriptionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDescriptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
