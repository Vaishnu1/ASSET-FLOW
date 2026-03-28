import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageReportComponent } from './manage-report/manage-report.component';
// import { SrNoprReportComponent } from './sr-nopr-report/sr-nopr-report.component';
// import { SrPrReportResultComponent } from './sr-pr-report-result/sr-pr-report-result.component';
// import { SrPrReportComponent } from './sr-pr-report/sr-pr-report.component';
// import { SrPrdaysReportComponent } from './sr-prdays-report/sr-prdays-report.component';


const routes: Routes = [
    {
      path: '',
      component: ManageReportComponent,
    },
    // { 
    //   path: 'srPrReportSearch', 
    //   component: SrPrReportComponent
    // },
    // { 
    //   path: 'srPrReportResult', 
    //   component: SrPrReportResultComponent
    // },
    // { 
    //   path: 'srNoprReportSearch', 
    //   component: SrNoprReportComponent
    // },
    // { 
    //   path: 'srPrdaysReportSearch', 
    // component: SrPrdaysReportComponent
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
