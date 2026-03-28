import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkflowDescriptionCreateComponent } from './workflow-description-create.component';

describe('WorkflowDescriptionCreateComponent', () => {
  let component: WorkflowDescriptionCreateComponent;
  let fixture: ComponentFixture<WorkflowDescriptionCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDescriptionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDescriptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
