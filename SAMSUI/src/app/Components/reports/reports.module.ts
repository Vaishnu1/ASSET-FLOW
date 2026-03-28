import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReportsRoutingModule } from './reports.routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { RepairServiceRequestReportComponent } from './repair-service-request-report/repair-service-request-report.component';
import { AssetCountValueReportComponent } from './asset-count-value-report/asset-count-value-report.component';
import { SrPrSearchComponent } from './manage-report/sr/sr-pr-search/sr-pr-search.component';
import { SrPrTotalCountComponent } from './manage-report/sr/sr-pr-total-count/sr-pr-total-count.component';
import { SrWithPrCountComponent } from './manage-report/sr/sr-with-pr-count/sr-with-pr-count.component';
import { SrWithOutPrCountComponent } from './manage-report/sr/sr-with-out-pr-count/sr-with-out-pr-count.component';
import { ModelDetailedReportComponent } from './model-report/model-detailed-report/model-detailed-report.component';
import { ManufacturerDetailedReportComponent } from './manufacturer-report/manufacturer-detailed-report/manufacturer-detailed-report.component';
import { ContractDetailedReportComponent } from './manage-report/contract-detailed-report/contract-detailed-report.component';
import { QualityIndicatorReportComponent } from './manage-report/quality-indicator-report/quality-indicator-report.component';
// import { SrOpenReportComponent } from './sr-open-report/sr-open-report.component';
// import { SrPrdaysReportComponent } from './sr-prdays-report/sr-prdays-report.component';
// import { SrNoprReportComponent } from './sr-nopr-report/sr-nopr-report.component';
// import { SrPrReportResultComponent } from './sr-pr-report-result/sr-pr-report-result.component';
// import { SrPrReportComponent } from './sr-pr-report/sr-pr-report.component';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { MttrAndMtbfReportComponent } from './mttr-and-mtbf-report/mttr-and-mtbf-report.component';
import { AiAutomatedReportsComponent } from './manage-report/ai-automated-reports/ai-automated-reports.component';

@NgModule({
  declarations: [
    ManageReportComponent,
    RepairServiceRequestReportComponent,
    AssetCountValueReportComponent,
    SrPrSearchComponent,
    SrPrTotalCountComponent,
    SrWithPrCountComponent,
    SrWithOutPrCountComponent,
    ModelDetailedReportComponent,
    ManufacturerDetailedReportComponent,
    ContractDetailedReportComponent,
    QualityIndicatorReportComponent,
    MttrAndMtbfReportComponent,
    AiAutomatedReportsComponent
    // SrOpenReportComponent,
    // SrPrdaysReportComponent,
    // SrNoprReportComponent,
    // SrPrReportResultComponent,
    // SrPrReportComponent

  ],
  imports: [
    ReportsRoutingModule,
    MaterialModule,
    CommonModule
  ],
  providers:
  [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
