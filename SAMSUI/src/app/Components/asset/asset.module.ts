import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { AssetRoutingModule } from './asset.routing.module';
import { PreInwardInventoryListComponent } from './pre-inward-inventory/pre-inward-inventory-list/pre-inward-inventory-list.component';
import { PreInwardInventoryCreateComponent } from './pre-inward-inventory/pre-inward-inventory-create/pre-inward-inventory-create.component';
import { PreInwardInventoryAddModelDialogComponent } from './pre-inward-inventory/pre-inward-inventory-add-model-dialog/pre-inward-inventory-add-model-dialog.component';
import { PreinwDocumentComponent } from './pre-inward-inventory/preinw-document/preinw-document.component';
import { PreInwWarrantyContractComponent } from './pre-inward-inventory/pre-inw-warranty-contract/pre-inw-warranty-contract.component';
import { AssetCreateComponent } from './Asset/asset-create/asset-create.component';
import { InwardInventorySrComponent } from './inward-inventory-sr/inward-inventory-sr.component';
import { AssetListComponent } from './Asset/asset-list/asset-list.component';
import { EditAssetInfoGroupedByPoNoDialogComponent } from './Asset/edit-asset-info-grouped-by-po-no-dialog/edit-asset-info-grouped-by-po-no-dialog.component';
import { AssetDocCreateComponent } from './Asset/asset-doc/asset-doc-create/asset-doc-create.component';
import { ChildAssetAddComponent } from './Asset/ChildAsset/child-asset-add/child-asset-add.component';
import { ServiceRequestHistoryComponent } from './Asset/Service/service-request-history/service-request-history.component';
import { AssetLoanHistoryComponent } from './Asset/asset-loan-history/asset-loan-history.component';
import { AssetLabelPrintComponent } from './Asset/asset-label-print/asset-label-print.component';
import { AssetHistoryComponent } from './Asset/asset-history/asset-history.component';
import { ServiceRequestAssetRetirementComponent } from './service-request-asset-retirement/service-request-asset-retirement.component';
import { ServiceRequestAssetRetirementListComponent } from './service-request-asset-retirement-list/service-request-asset-retirement-list.component';
import { ChildAssetComponent } from './Asset/ChildAsset/child-asset/child-asset.component';
import { RetireDisposeRejectPopupComponent } from './retire-dispose-reject-popup/retire-dispose-reject-popup.component';
import { AssetRelocationSearchComponent } from './Asset-Relocation/asset-relocation-search/asset-relocation-search.component';
import { AssetRelocationListComponent } from './Asset-Relocation/asset-relocation-list/asset-relocation-list.component';
import { AssetRelocationApproveRejectComponent } from './Asset-Relocation/asset-relocation-approve-reject/asset-relocation-approve-reject.component';
import { AssetPhysicalAuditListComponent } from './Asset-Physical-Audit/asset-physical-audit-list/asset-physical-audit-list.component';
import { AssetPhysicalAuditCreateComponent } from './Asset-Physical-Audit/asset-physical-audit-create/asset-physical-audit-create.component';
import { AssetPhysicalAuditEditComponent } from './Asset-Physical-Audit/asset-physical-audit-edit/asset-physical-audit-edit.component';
import { GatePassListComponent } from './Gate-Pass/gate-pass-list/gate-pass-list.component';
import { GatePassCreateComponent } from './Gate-Pass/gate-pass-create/gate-pass-create.component';
import { GatePassReturnInfoComponent } from './Gate-Pass/gate-pass-return-info/gate-pass-return-info.component';
import { LoanListComponent } from './Loans/loan-list/loan-list.component';
import { LoanCreateComponent } from './Loans/loan-create/loan-create.component';
import { InternalLoanListComponent } from './Loans/internal-loan-list/internal-loan-list.component';
import { InternalLoanCreateComponent } from './Loans/internal-loan-create/internal-loan-create.component';
import { PopupConfirmationGatepassComponent } from './Loans/popup-confirmation-gatepass/popup-confirmation-gatepass.component';
import { ReturnRequestPopupComponent } from './Loans/return-request-popup/return-request-popup.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractCreateComponent } from './contract/contract-create/contract-create.component';
import { AssetViewComponent } from './Asset/asset-view/asset-view.component';
import { ContractPeriodCreateComponent } from './contract/contract-period-create/contract-period-create.component';
import { ContractDocCreateComponent } from './contract/contract-doc-create/contract-doc-create.component';
import { BulkSerialNumberUploadComponent } from './pop-up/bulk-serial-number-upload/bulk-serial-number-upload.component';
import { ViewChildassetInPreinwardComponent } from './Asset/view-childasset-in-preinward/view-childasset-in-preinward.component';
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { AssetItemEditComponent } from './asset-item-edit/asset-item-edit.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { DateAdapter } from '@angular/material/core';
import { AssetStatusEditComponent } from './Asset/asset-status-edit/asset-status-edit.component';

import { CustomFieldSearchComponent } from './Asset/custom-field-search/custom-field-search.component';
import { AssetAssigneeTempComponent } from './asset-assignee-temp/asset-assignee-temp.component';
import { SearchContractAssetComponent } from './contract/search-contract-asset/search-contract-asset.component';
import { SettingsModule } from '../settings/settings.module';
import { CommonWorkflowApprovalDialogComponent } from '../workflow/workflowApproval/common-workflow-approval-dialog/common-workflow-approval-dialog.component';
import { BulkAssetReassignComponent } from './Asset/bulk-asset-reassign/bulk-asset-reassign.component';
import { AssetCreateV1Component } from './Asset/asset-create-v1/asset-create-v1.component';
import { AddContractInfoComponent } from './add-contract-info/add-contract-info.component';
import { PurchaseRequestHistoryComponent } from './Asset/purchase-request-history/purchase-request-history.component';
import { AssetReportComponent } from './Asset/asset-report/asset-report.component';
import { AssetLabelPrintV1Component } from './Asset/asset-label-print-v1/asset-label-print-v1.component';
import { PhysicalAuditCreateConfirmationComponent } from './Asset/physical-audit-create-confirmation/physical-audit-create-confirmation.component';
import { ViewAuditImagesComponent } from './Asset/view-audit-images/view-audit-images.component';
import { ShowMttrMtbfFormulaComponent } from './Asset/show-mttr-mtbf-formula/show-mttr-mtbf-formula.component';
import { RejectReasonViewComponent } from './Asset/reject-reason-view/reject-reason-view.component';
import { AssetViewWorkLogComponent } from './Asset/asset-view-work-log/asset-view-work-log.component';
import { PhysicalAuditCreateConfirmationV1Component } from './Asset-Physical-Audit/physical-audit-create-confirmation-v1/physical-audit-create-confirmation-v1.component';
import { AssetBySubCategoryV2Component } from '../dashboard/charts/asset-by-sub-category-v2/asset-by-sub-category-v2.component';

@NgModule({
  declarations: [
    PreInwardInventoryListComponent,
    PreInwardInventoryCreateComponent,
    PreInwardInventoryAddModelDialogComponent,
    PreinwDocumentComponent,
    PreInwWarrantyContractComponent,
    AssetCreateComponent,
    InwardInventorySrComponent,
    AssetListComponent,
    EditAssetInfoGroupedByPoNoDialogComponent,
    AssetDocCreateComponent,
    ChildAssetAddComponent,
    ServiceRequestHistoryComponent,
    AssetLoanHistoryComponent,
    AssetLabelPrintComponent,
    AssetHistoryComponent,
    ServiceRequestAssetRetirementComponent,
    ServiceRequestAssetRetirementListComponent,
    ChildAssetComponent,
    RetireDisposeRejectPopupComponent,
    AssetRelocationSearchComponent,
    AssetRelocationListComponent,
    AssetRelocationApproveRejectComponent,
    AssetPhysicalAuditListComponent,
    AssetPhysicalAuditCreateComponent,
    AssetPhysicalAuditEditComponent,
    GatePassListComponent,
    GatePassCreateComponent,
    GatePassReturnInfoComponent,
    LoanListComponent,
    LoanCreateComponent,
    InternalLoanListComponent,
    InternalLoanCreateComponent,
    PopupConfirmationGatepassComponent,
    ReturnRequestPopupComponent,
    ContractListComponent,
    ContractCreateComponent,
    AssetViewComponent,
    ContractPeriodCreateComponent,
    ContractDocCreateComponent,
    BulkSerialNumberUploadComponent,
    UploadCertificateComponent,
    ViewChildassetInPreinwardComponent,
    DocumentListComponent,
    AssetItemEditComponent,
    AssetStatusEditComponent,
    CustomFieldSearchComponent,
    AssetAssigneeTempComponent,
    SearchContractAssetComponent,
    CommonWorkflowApprovalDialogComponent,
    BulkAssetReassignComponent,
    AssetCreateV1Component,
    AddContractInfoComponent,
    PurchaseRequestHistoryComponent,
    AssetReportComponent,
    AssetLabelPrintV1Component,
    PhysicalAuditCreateConfirmationComponent,
    ViewAuditImagesComponent,
    ShowMttrMtbfFormulaComponent,
    RejectReasonViewComponent,
    AssetViewWorkLogComponent,
    PhysicalAuditCreateConfirmationV1Component,
    AssetBySubCategoryV2Component,    
],
  imports: [
    AssetRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule,
    SettingsModule
  ],
  providers:
  [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AssetModule { }

