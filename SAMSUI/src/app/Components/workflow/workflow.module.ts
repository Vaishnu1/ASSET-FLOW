import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkflowRoutingModule } from './workflow.routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { WorkflowDescriptionListComponent } from './workflowDescription/workflow-description-list/workflow-description-list.component';
import { WorkflowDescriptionCreateComponent } from './workflowDescription/workflow-description-create/workflow-description-create.component';
import { WorkflowApprovalListComponent } from './workflowApproval/workflow-approval-list/workflow-approval-list.component';
import { WorkflowHierarchyCreateComponent } from './workflowHierarchy/workflow-hierarchy-create/workflow-hierarchy-create.component';
import { WorkflowHierarchyDefaultCreateComponent } from './workflowHierarchy/workflow-hierarchy-default-create/workflow-hierarchy-default-create.component';
import { WorkflowHierarchyLevelCreateComponent } from './workflowHierarchy/workflow-hierarchy-level-create/workflow-hierarchy-level-create.component';
import { WorkflowHierarchyListComponent } from './workflowHierarchy/workflow-hierarchy-list/workflow-hierarchy-list.component';
import { NotificationExplanationDialogComponent } from '../Dialog-Components/notification/notification-explanation-dialog/notification-explanation-dialog.component';




@NgModule({
  declarations: [
    WorkflowDescriptionListComponent,
    WorkflowDescriptionCreateComponent,
    WorkflowApprovalListComponent,
    WorkflowHierarchyCreateComponent,
    WorkflowHierarchyDefaultCreateComponent,
    WorkflowHierarchyLevelCreateComponent,
    WorkflowHierarchyListComponent,
    NotificationExplanationDialogComponent
],
  imports: [
    WorkflowRoutingModule,
    MaterialModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkflowModule { }
