import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service.routing.module';
import { ServiceRequestListComponent } from './service-request-list/service-request-list.component';
import { ServiceRequestViewIndividalComponent } from './service-request-view-individal/service-request-view-individal.component';
import { ServiceRequestCreateComponent } from './service-request-create/service-request-create.component';
import { SrViewWorkLogComponent } from './tabs/sr-view-work-log/sr-view-work-log.component';
import { SrCheckPointsComponent } from './tabs/sr-check-points/sr-check-points.component';
import { AssetAssignmentListComponent } from './Asset-Assignment/asset-assignment-list/asset-assignment-list.component';
import { MaintenanaceScheduleCreateComponent } from '../MaintenanceSchedule/maintenanace-schedule-create/maintenanace-schedule-create.component';
import { MaintenanceScheduleListComponent } from '../MaintenanceSchedule/maintenance-schedule-list/maintenance-schedule-list.component';
import { PriorityListComponent } from '../Master/serviceRequestMain/priority-list/priority-list.component';
import { SeverityListComponent } from '../Master/serviceRequestMain/severity-list/severity-list.component';
import { CausecodeListComponent } from '../Master/serviceRequestMain/causecode-list/causecode-list.component';
import { ActioncodeListComponent } from '../Master/serviceRequestMain/actioncode-list/actioncode-list.component';
import { PriorityCreateComponent } from '../Dialog-Components/serviceRequestPopUp/priority-create/priority-create.component';
import { SeverityCreateComponent } from '../Dialog-Components/serviceRequestPopUp/severity-create/severity-create.component';
import { CausecodeCreateComponent } from '../Dialog-Components/serviceRequestPopUp/causecode-create/causecode-create.component';
import { ActioncodeCreateComponent } from '../Dialog-Components/serviceRequestPopUp/actioncode-create/actioncode-create.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SrAssignEngineerComponent } from './sr-assign-engineer/sr-assign-engineer.component';
import { SrEmailNotifyComponent } from './sr-email-notify/sr-email-notify.component';
import { SrReOpenComponent } from './sr-re-open/sr-re-open.component';
import { SrUpdateStatusComponent } from './sr-update-status/sr-update-status.component';
import { SrAddLabourComponent } from './tabs/sr-add-labour/sr-add-labour.component';
import { ServiceRequestViewComponent } from './service-request-view/service-request-view.component';
import { SrActivityEmailComponent } from './tabs/sr-activity-email/sr-activity-email.component'
import { SrActivityServiceCostComponent } from './tabs/sr-activity-service-cost/sr-activity-service-cost.component';
import { SrDocumentComponent } from './tabs/sr-document/sr-document.component';
import { SrActivityDocComponent } from './tabs/sr-activity-doc/sr-activity-doc.component';
import { MaintenanceAddAssetScheduleComponent } from '../MaintenanceSchedule/maintenance-add-asset-schedule/maintenance-add-asset-schedule.component';
import { MaintenanceScheduleAssetWiseComponent } from '../MaintenanceSchedule/maintenance-schedule-asset-wise/maintenance-schedule-asset-wise.component';
import { PurchaseReqForNhComponent } from './purchase-req-for-nh/purchase-req-for-nh.component';
import { SrPurchaseRequestAddForNhComponent } from './sr-purchase-request-add-for-nh/sr-purchase-request-add-for-nh.component';
import { OtpVerificationComponent } from '../Common-components/otp-verification/otp-verification.component';
import { SubTicketPopupComponent } from './sub-ticket-popup/sub-ticket-popup.component';
import { ServiceRequestTrainingComponent } from './tabs/service-request-training/service-request-training.component';
import { ServiceRequestHandOverComponent } from './tabs/service-request-hand-over/service-request-hand-over.component';
import { SrPdfConfirmationDialogComponent } from '../Dialog-Components/serviceRequestPopUp/sr-pdf-confirmation-dialog/sr-pdf-confirmation-dialog.component';
import { UpdateInstallationWoByBatchDialogComponent } from './update-installation-wo-by-batch-dialog/update-installation-wo-by-batch-dialog.component';
import { SrItemRequestComponent } from './sr-item-request/sr-item-request.component';
import { SrSubStatusInfoComponent } from './sr-sub-status-info/sr-sub-status-info.component';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { DateAdapter } from '@angular/material/core';
import { SrDamageInfoComponent } from './sr-damage-info/sr-damage-info.component';
import { ServiceRequestReportComponent } from './service-request-report/service-request-report.component';
import { SrFeedbackComponent } from './sr-feedback/sr-feedback.component';
import { SrReOpenConfirmationComponent } from './sr-re-open-confirmation/sr-re-open-confirmation.component';
import { SrUpdateRemarksComponent } from './sr-update-remarks/sr-update-remarks.component';
import { ServiceRequestViewIndividualV1Component } from './service-request-view-individual-v1/service-request-view-individual-v1.component';


@NgModule({
  declarations: [
    ServiceRequestListComponent,
    SrEmailNotifyComponent,
    ServiceRequestViewIndividalComponent,
    ServiceRequestCreateComponent,
    SrAssignEngineerComponent,
    ServiceRequestViewComponent,
    SrActivityEmailComponent,
    SrActivityServiceCostComponent,
    SrDocumentComponent,
    SrActivityDocComponent,
    SrViewWorkLogComponent,
    SrCheckPointsComponent,
    AssetAssignmentListComponent,
    MaintenanceScheduleListComponent,
    MaintenanaceScheduleCreateComponent,
    PriorityListComponent,
    PriorityCreateComponent,
    SeverityListComponent,
    SeverityCreateComponent,
    CausecodeListComponent,
    CausecodeCreateComponent,
    ActioncodeListComponent,
    ActioncodeCreateComponent,
    SrReOpenComponent,
    SrUpdateStatusComponent,
    SrAddLabourComponent,
    MaintenanceAddAssetScheduleComponent,
    MaintenanceScheduleAssetWiseComponent,
    PurchaseReqForNhComponent,
    SrPurchaseRequestAddForNhComponent,
    OtpVerificationComponent,
    SubTicketPopupComponent,
    ServiceRequestTrainingComponent,
    ServiceRequestHandOverComponent,
    SrPdfConfirmationDialogComponent,
    UpdateInstallationWoByBatchDialogComponent,
    SrItemRequestComponent,
    SrSubStatusInfoComponent,
    SrDamageInfoComponent,
    ServiceRequestReportComponent,
    SrFeedbackComponent,
    SrReOpenConfirmationComponent,
    SrUpdateRemarksComponent,
    ServiceRequestViewIndividualV1Component,

],
  imports: [
    ServiceRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule
  ],
  providers:
  [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceModule { }
