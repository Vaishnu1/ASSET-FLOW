import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveRejectAssetAssigneeComponent } from './Components/approve-reject-asset-assignee/approve-reject-asset-assignee.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {  
    path: '', 
    component: LoginComponent 
  },
  {
    path: 'approve/reject', 
    component: ApproveRejectAssetAssigneeComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}