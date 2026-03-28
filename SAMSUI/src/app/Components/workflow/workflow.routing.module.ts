import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowApprovalListComponent } from './workflowApproval/workflow-approval-list/workflow-approval-list.component';
import { WorkflowDescriptionListComponent } from './workflowDescription/workflow-description-list/workflow-description-list.component';
import { WorkflowHierarchyCreateComponent } from './workflowHierarchy/workflow-hierarchy-create/workflow-hierarchy-create.component';
import { WorkflowHierarchyListComponent } from './workflowHierarchy/workflow-hierarchy-list/workflow-hierarchy-list.component';


const routes: Routes = [
    {
      path: 'workflowDescription',
      component: WorkflowDescriptionListComponent,
    },
    {
       path: 'workflowHierarchy',
       component :WorkflowHierarchyListComponent
    }, 
    {
       path: 'workflowHierarchyCreate/:pId/:mode', 
       component:WorkflowHierarchyCreateComponent
    },
    {
       path: 'workflowApproval',
       component :WorkflowApprovalListComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
