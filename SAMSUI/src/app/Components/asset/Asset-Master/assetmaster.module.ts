import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaterialModule } from '../../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { AssetMasterRoutingModule } from './assetmaster.routing.module';
import { AssetStatusListComponent } from './asset-status-list/asset-status-list.component';
import { AssetCategoryListComponent } from './asset-category-list/asset-category-list.component';
import { AssetSubCategoryListComponent } from './asset-sub-category-list/asset-sub-category-list.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';
import { AssetGroupListComponent } from './asset-group-list/asset-group-list.component';
import { DeviceCodeComponent } from './device-code-list/device-code-list.component';
import { StatutoryRequirementListComponent } from './statutory-requirement-list/statutory-requirement-list.component';
import { BatchAssetListComponent } from './batch-asset/batch-asset-list/batch-asset-list.component';
import { BatchAssetHdrCreateComponent } from './batch-asset/batch-asset-hdr-create/batch-asset-hdr-create.component';
import { AssetGroupCreateComponent } from './asset-group-create/asset-group-create.component';
import { AssetstatusCreateComponent } from './assetstatus-create/assetstatus-create.component';
import { AssetSubCategoryCreateComponent } from './asset-sub-category-create/asset-sub-category-create.component';
import { CertificatesCreateComponent } from './certificates-create/certificates-create.component';
import { AssetManufacturerComponent } from './Asset-Manufacturer/asset-manufacturer/asset-manufacturer.component';
import { ModelViewComponent } from './Model/model-view/model-view.component';
import { ModelHistoryComponent } from './Model/model-history/model-history.component';
import { TechnicalSpecialistPopupComponent } from './Model/technical-specialist-popup/technical-specialist-popup.component';
import { ModelListComponent } from './Model/model-list/model-list.component';
import { ModelCreateComponent } from './Model/model-create/model-create.component';
import { CheckpointsCreateComponent } from './Model/subTabs/checkpoints-create/checkpoints-create.component';
import { SolutionBankCreateComponent } from './Model/subTabs/solution-bank-create/solution-bank-create.component';
import { SelfanalysisCreateComponent } from './Model/subTabs/selfanalysis-create/selfanalysis-create.component';
import { AdditionalinfoCreateComponent } from './Model/subTabs/additionalinfo-create/additionalinfo-create.component';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { ParameterCreateComponent } from './parameter-create/parameter-create.component';
import { ParameterTypeListComponent } from './parameter-type-list/parameter-type-list.component';
import { ServiceParameterComponent } from './service-parameter/service-parameter.component';
import { ParameterTypeCreateComponent } from './parameter-type-create/parameter-type-create.component';
import { CustomerSiteCreateComponent } from './customer/customer-site-create/customer-site-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { AssetTypeCreateComponent } from './asset-type-create/asset-type-create.component';
import { AssetCategoryCreateComponent } from './asset-category-create/asset-category-create.component';
import { AddAssetToBatchDialogComponent } from './batch-asset/add-asset-to-batch-dialog/add-asset-to-batch-dialog.component';
import { AssetSubCategoryCustomFieldsComponent } from './asset-sub-category-custom-fields/asset-sub-category-custom-fields.component';
import { AssetSubCategoryCustomGroupFieldsComponent } from './asset-sub-category-custom-group-fields/asset-sub-category-custom-group-fields.component';
import { PrinterSubCategoryMappingComponent } from '../../Dialog-Components/assetPopUp/printer-sub-category-mapping/printer-sub-category-mapping.component';
import { DocumentCreateComponent } from './Model/subTabs/document-create/document-create.component';
import { CustomFieldComboAddComponent } from './custom-field-combo-add/custom-field-combo-add.component';
import { DeviceCodeDialogComponent } from './device-code-create/device-code-create.component';
import { StatutoryRequirementCreateComponent } from './statutory-requirement-create/statutory-requirement-create.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ParameterGroupListComponent } from './parameter-group-list/parameter-group-list.component';
import { ParameterGroupCreateComponent } from './parameter-group-create/parameter-group-create.component';

@NgModule({
  declarations: [
    AssetStatusListComponent,
    AssetCategoryListComponent,
    AssetSubCategoryListComponent,
    AssetTypeListComponent,
    AssetGroupListComponent,
    DeviceCodeComponent,
    DeviceCodeDialogComponent,
    StatutoryRequirementListComponent,
    BatchAssetListComponent,
    BatchAssetHdrCreateComponent,
    AssetGroupCreateComponent,
    AssetstatusCreateComponent,
    AssetSubCategoryCreateComponent,
    CertificatesCreateComponent,
    AssetManufacturerComponent,
    ModelViewComponent,
    ModelHistoryComponent,
    TechnicalSpecialistPopupComponent,
    ModelListComponent,
    ModelCreateComponent,
    CheckpointsCreateComponent,
    SolutionBankCreateComponent,
    SelfanalysisCreateComponent,
    AdditionalinfoCreateComponent,
    ParameterListComponent,
    ParameterCreateComponent,
    ParameterTypeListComponent,
    ParameterTypeCreateComponent,
    ServiceParameterComponent,
    CustomerListComponent,
    CustomerSiteCreateComponent,
    CustomerCreateComponent,
    AssetTypeCreateComponent,
    AssetCategoryCreateComponent,
    AddAssetToBatchDialogComponent,
    AssetSubCategoryCustomFieldsComponent,
    AssetSubCategoryCustomGroupFieldsComponent,
    PrinterSubCategoryMappingComponent,
    DocumentCreateComponent,
    CustomFieldComboAddComponent,
    StatutoryRequirementCreateComponent,
    ParameterGroupListComponent,
    ParameterGroupCreateComponent,

],
  imports: [
    AssetMasterRoutingModule,
    MaterialModule,
    SharedModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AssetMasterModule { }
