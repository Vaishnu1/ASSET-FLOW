import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeRoutingModule } from './home.routing.module';
import { BuildMenuComponent } from '../Components/Common-components/build-menu/build-menu.component';
import { HeaderComponent } from '../Components/Common-components/header/header.component';
import { MaterialModule } from '../@shared/material.module';
import { CommonModule } from '@angular/common';

import { ChangePasswordComponent } from '../Components/Common-components/change-password/change-password.component';
import { DeleteConfirmationComponent } from '../Components/Common-components/delete-confirmation/delete-confirmation.component';
import { InformationPopupComponent } from '../Components/Common-components/information-popup/information-popup.component';
import { CancelConfirmationComponent } from '../Components/Common-components/cancel-confirmation/cancel-confirmation/cancel-confirmation.component';
import { PoPdfPreviewComponent } from '../Components/Common-components/po-pdf-preview/po-pdf-preview/po-pdf-preview.component';
import { CancelConfirmationWithoutReasonComponent } from '../Components/Common-components/cancel-confirmation-without-reason/cancel-confirmation-without-reason.component';
import { UpdateApproveConfirmationComponent } from '../Components/Common-components/update-approve-confirmation/update-approve-confirmation.component';
import { PdfConfirmationComponent } from '../Components/Common-components/pdf-confirmation/pdf-confirmation.component';

// import { AdvancedSearchComponent } from '../Components/Dialog-Components/advanced-search/advanced-search.component';
// import { EquipmentUtilizationComponent } from '../Components/asset/Asset/equipment-utilization/equipment-utilization.component';
// import { MaintenanceCreateComponent } from '../Components/asset/Maintenance/maintenance-create/maintenance-create.component';
// import { MaintenanceListComponent } from '../Components/asset/Maintenance/maintenance-list/maintenance-list.component';
// import { VolumeLicenseExportFromExcelComponent } from '../Components/Dialog-Components/assetPopUp/volume-license-export-from-excel/volume-license-export-from-excel.component';
// import { EntityGroupCreateComponent } from '../Components/Dialog-Components/Master/entity-group-create/entity-group-create.component';
// import { LegalEntityEditComponent } from '../Components/Dialog-Components/Master/legal-entity-edit/legal-entity-edit.component';
// import { LocationViewComponent } from '../Components/Master/locMain/location-view/location-view.component';
// import { EntityGroupListComponent } from '../Components/Master/orgMain/subComponents/entity-group-list/entity-group-list.component';
// import { LegalEntityViewComponent } from '../Components/Master/orgMain/subComponents/legal-entity-view/legal-entity-view.component';
// import { PricelistCreateComponent } from '../Components/Purchase/pricelist-create/pricelist-create.component';
// import { PricelistViewComponent } from '../Components/Purchase/pricelist-view/pricelist-view.component';
// import { PricelistComponent } from '../Components/Purchase/pricelist/pricelist.component';
// import { PurchaseOrderViewComponent } from '../Components/Purchase/purchase-order-view/purchase-order-view.component';
// import { PurchaseQuoteCreateComponent } from '../Components/Purchase/purchase-quote-create/purchase-quote-create.component';
// import { PurchaseQuoteViewComponent } from '../Components/Purchase/purchase-quote-view/purchase-quote-view.component';
// import { SrOpenReportResultComponent } from '../Components/reports/sr-open-report-result/sr-open-report-result.component';
// import { RequestForStockCreateComponent } from '../Components/service/request-for-stock-create/request-for-stock-create.component';
// import { ServiceRequestListPaComponent } from '../Components/service/service-request-list-pa/service-request-list-pa.component';
// import { ServiceRequestListPMComponent } from '../Components/service/service-request-list-pm/service-request-list-pm.component';
// import { ServiceRequestListQaComponent } from '../Components/service/service-request-list-qa/service-request-list-qa.component';
// import { ServiceRequestReassignComponent } from '../Components/service/service-request-reassign/service-request-reassign.component';

@NgModule({
  declarations: [
    BuildMenuComponent,
    HeaderComponent,
    ChangePasswordComponent,
    DeleteConfirmationComponent,
    InformationPopupComponent,
    CancelConfirmationComponent,
    PoPdfPreviewComponent,
    CancelConfirmationWithoutReasonComponent,
    UpdateApproveConfirmationComponent,
    PdfConfirmationComponent

    // AdvancedSearchComponent,
    // MaintenanceListComponent,
    // MaintenanceCreateComponent,
    // PricelistComponent,
    // PurchaseQuoteCreateComponent,
    // PricelistCreateComponent,
    // PurchaseOrderViewComponent,
    // PricelistViewComponent,
    // PurchaseQuoteViewComponent,
    //  SrOpenReportResultComponent,
    //  ServiceRequestListPMComponent,
    //  ServiceRequestListQaComponent,
    //  ServiceRequestListPaComponent,
    //  EquipmentUtilizationComponent,  
    //  ServiceRequestReassignComponent,
    //  RequestForStockCreateComponent,
    //  VolumeLicenseExportFromExcelComponent,
    // EntityGroupCreateComponent,
    // EntityGroupListComponent,
    // LegalEntityEditComponent,
    //  LocationViewComponent,
    //  LegalEntityViewComponent

],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    CommonModule,
    // AngularEditorModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
