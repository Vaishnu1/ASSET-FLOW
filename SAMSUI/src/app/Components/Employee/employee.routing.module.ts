import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';


const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'employeeCreate/:pId', component: EmployeeCreateComponent },
  { path: 'employeeView/:employeeId', component: EmployeeViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
