import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildMenuComponent } from '../Components/Common-components/build-menu/build-menu.component';
import { ChangePasswordComponent } from '../Components/Common-components/change-password/change-password.component';

// import { SrOpenReportComponent } from '../Components/reports/sr-open-report/sr-open-report.component';
// import { EquipmentUtilizationComponent } from '../Components/asset/Asset/equipment-utilization/equipment-utilization.component';
// import { MaintenanceCreateComponent } from '../Components/asset/Maintenance/maintenance-create/maintenance-create.component';
// import { MaintenanceListComponent } from '../Components/asset/Maintenance/maintenance-list/maintenance-list.component';
// import { LocationViewComponent } from '../Components/Master/locMain/location-view/location-view.component';
// import { LegalEntityViewComponent } from '../Components/Master/orgMain/subComponents/legal-entity-view/legal-entity-view.component';
// import { PurchaseQuoteViewComponent } from '../Components/Purchase/purchase-quote-view/purchase-quote-view.component';
// import { SrOpenReportResultComponent } from '../Components/reports/sr-open-report-result/sr-open-report-result.component';
// import { RequestForStockCreateComponent } from '../Components/service/request-for-stock-create/request-for-stock-create.component';
// import { ServiceRequestListPaComponent } from '../Components/service/service-request-list-pa/service-request-list-pa.component';
// import { ServiceRequestListPMComponent } from '../Components/service/service-request-list-pm/service-request-list-pm.component';
// import { ServiceRequestListQaComponent } from '../Components/service/service-request-list-qa/service-request-list-qa.component';

const routes: Routes = [
    {
      path: '',
      component: BuildMenuComponent,
      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('../Components/dashboard/dashboard.module').then(m => m.DashboardModule)
        },    
        {
          path: 'employee',
          loadChildren: () => import('../Components/Employee/employee.module').then(m => m.EmployeeModule)
        },  
        {
          path: 'inventory',
          loadChildren: () => import('../Components/Inventory/inventory.module').then(m => m.InventoryModule)
        }, 
        {
          path: 'assetmaster',
          loadChildren: () => import('../Components/asset/Asset-Master/assetmaster.module').then(m => m.AssetMasterModule)
        },  
        {
          path: 'asset',
          loadChildren: () => import('../Components/asset/asset.module').then(m => m.AssetModule)
        },   
        { 
          path: 'purchase',
          loadChildren: () => import('../Components/Purchase/purchase.module').then(m => m.PurchaseModule)
        },
        {
          path: 'manageReports',
          loadChildren: () => import('../Components/reports/reports.module').then(m => m.ReportsModule)
        },
        {
          path: 'workflow',
          loadChildren: () => import('../Components/workflow/workflow.module').then(m => m.WorkflowModule)
        },
        {
          path: 'budget',
          loadChildren: () => import('../Components/budget/budget.module').then(m => m.BudgetModule)
        },  
        {
          path: 'serviceRequest',
          loadChildren: () => import('../Components/service/service.module').then(m => m.ServiceModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('../Components/settings/settings.module').then(m => m.SettingsModule)
        },
        {
          path: 'settingsmaster',
          loadChildren: () => import('../Components/settings/Organization/settingsmaster.module').then(m => m.SettingsMasterModule)
        }, 

        { path: 'changePassword',component: ChangePasswordComponent},
        {
          path: 'accounts',
          loadChildren: () => import('../Components/accounts/accounts.module').then(m => m.AccountsModule)
        }, 
         {
          path: 'notification',
          loadChildren: () => import('../Components/Notification/notification.module').then(m => m.NotificationModule)
        }, 

          // { path: 'srOpenReportSearch', component: SrOpenReportComponent},        
          // { path: 'maintenance', component: MaintenanceListComponent },
          // { path: 'maintenanceCreate', component: MaintenanceCreateComponent },
          // { path: 'purchaseQuoteView', component: PurchaseQuoteViewComponent},
          // { path: 'srOpenReportResult', component: SrOpenReportResultComponent},
          // { path: 'locationView/:pId',component:LocationViewComponent},  
          // { path: 'legalEntityView/:pId',component:LegalEntityViewComponent},
          // { path: 'serviceRequestPM',component: ServiceRequestListPMComponent},
          // { path: 'serviceRequestQA',component: ServiceRequestListQaComponent},
          // { path: 'serviceRequestPA',component: ServiceRequestListPaComponent},
          // { path: 'equipmentUtilization', component: EquipmentUtilizationComponent},
          // { path: 'requestForStock/:pId/:mode', component: RequestForStockCreateComponent},

          //DASHBOARD NAVIGATION
          // { path: 'serviceRequestPMList/:type/:functionality/:status', component: ServiceRequestListPMComponent}, 
          // { path: 'serviceRequestPAList/:type/:functionality/:status', component: ServiceRequestListPaComponent}, 
          // { path: 'serviceRequestQAList/:type/:functionality/:status', component: ServiceRequestListQaComponent}
      ]         
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
