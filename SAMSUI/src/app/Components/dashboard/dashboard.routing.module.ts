import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardMainV1Component } from './dashboard-main-v1/dashboard-main-v1.component';
import { DashboardMainV2Component } from './dashboard-main-v2/dashboard-main-v2.component';


const routes: Routes = [
    {
      path: '',
      component: DashboardMainV2Component,
    },
    {
      path:'superSet',
      component: DashboardMainV1Component
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
