import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceScheduleListComponent } from '../MaintenanceSchedule/maintenance-schedule-list/maintenance-schedule-list.component';
import { AssetAssignmentListComponent } from './Asset-Assignment/asset-assignment-list/asset-assignment-list.component';
import { ServiceRequestCreateComponent } from './service-request-create/service-request-create.component';
import { ServiceRequestListComponent } from './service-request-list/service-request-list.component';
import { ServiceRequestViewIndividalComponent } from './service-request-view-individal/service-request-view-individal.component';
import { MaintenanaceScheduleCreateComponent } from '../../Components/MaintenanceSchedule/maintenanace-schedule-create/maintenanace-schedule-create.component';
import { PriorityListComponent } from '../Master/serviceRequestMain/priority-list/priority-list.component';
import { ServiceRequestViewIndividualV1Component } from './service-request-view-individual-v1/service-request-view-individual-v1.component';


const routes: Routes = [
  { path: 'serviceRequestList', component:  ServiceRequestListComponent },
  { path: 'serviceView/:pId/:mode/:tab',component: ServiceRequestViewIndividalComponent },
  { path: 'serviceRequestCreate/:pId',component: ServiceRequestCreateComponent },
  { path: 'assetAssignment', component: AssetAssignmentListComponent },
  { path: 'maintenanceSchedule', component: MaintenanceScheduleListComponent },
  { path: 'maintenanceScheduleCreate/:pId/:mode', component: MaintenanaceScheduleCreateComponent },
  { path: 'service', component: PriorityListComponent},
  { path: 'serviceRequestList/:type/:functionality/:status', component: ServiceRequestListComponent},
  { path: 'serviceViewV1/:pId/:mode/:tab',component: ServiceRequestViewIndividualV1Component },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
