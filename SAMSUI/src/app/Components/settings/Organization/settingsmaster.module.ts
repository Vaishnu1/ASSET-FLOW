import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { SettingsMasterRoutingModule } from './settingsmaster.routing.module';
import { CurrencyCodeListComponent } from './currency-code/currency-code-list/currency-code-list.component';
import { CurrencyCodeCreateComponent } from './currency-code/currency-code-create/currency-code-create.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { DesignationCreateComponent } from './designation/designation-create/designation-create.component';
import { LegalEntityListComponent } from './legal-entity/legal-entity-list/legal-entity-list.component';
import { LegalEntityCreateComponent } from './legal-entity/legal-entity-create/legal-entity-create.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { RegionCreateComponent } from './region/region-create/region-create.component';
import { TaxListComponent } from './tax/tax-list/tax-list.component';
import { TaxCreateComponent } from './tax/tax-create/tax-create.component';
import { SubdepartmentCreateComponent } from './subdepartment/subdepartment-create/subdepartment-create.component';
import { SubdepartmentListComponent } from './subdepartment/subdepartment-list/subdepartment-list.component';
import { UomListComponent } from './uom/uom-list/uom-list.component';
import { UomCreateComponent } from './uom/uom-create/uom-create.component';
import { BuildingComponent } from './building/building.component';
import { BuildingBlockCreateComponent } from './building/building-module/building-block-create/building-block-create.component';
import { BuildingFloorCreateComponent } from './building/building-module/building-floor-create/building-floor-create.component';
import { BuildingRoomCreateComponent } from './building/building-module/building-room-create/building-room-create.component';
import { BuildingSegmentCreateComponent } from './building/building-module/building-segment-create/building-segment-create.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { RegistrationPopupComponent } from './location/location-create/modal/registration-popup/registration-popup.component';
import { ModuleListComponent } from './item-master-organization/module-list/module-list.component';
import { ItemMasterListComponent } from './item-master-organization/item-master-list/item-master-list.component';
import { ItemMasterComponent } from './item-master-organization/item-master/item-master.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { DateAdapter } from '@angular/material/core';
import { ItemCategoryComponent } from '../../Master/itemMaster/item-category/item-category.component';
import { ItemsCategoryComponent } from './item-master-organization/items-category/items-category.component';
import { ItemTypeCreateComponent } from './item-master-organization/item-type-create/item-type-create.component';
import { ItemBranchMappingComponent } from './item-master-organization/item-branch-mapping/item-branch-mapping.component';
import { ModuleCreateComponent } from './item-master-organization/module-create/module-create.component';
import { ItemMasterCreateComponent } from './item-master-organization/item-master-create/item-master-create.component';
import { ItemTypeComponent } from './item-master-organization/item-type/item-type.component';
import { ItemsCategoryCreateComponent } from './item-master-organization/items-category-create/items-category-create.component';
import { ItemCategoryCreateComponent } from '../../Dialog-Components/item/item-category-create/item-category-create.component';
import { DepartmentSubdepartmentCreateComponent } from './location/location-create/department-subdepartment-create/department-subdepartment-create.component';
import { BusinessPartnerListComponent } from '../businessPartner/business-partner-list/business-partner-list.component';
import { BusinessPartnerCreateComponent } from '../businessPartner/business-partner-create/business-partner-create.component';
import { BusinessPartnerSiteCreateComponent } from '../businessPartner/business-partner-site-create/business-partner-site-create.component';
import { BusinessPartnerContactCreateComponent } from '../businessPartner/business-partner-contact-create/business-partner-contact-create.component';
import { BusinessPartnerRegCreateComponent } from '../businessPartner/business-partner-reg-create/business-partner-reg-create.component';
import { PurhcaseTermsMainComponent } from './purchase-terms/purhcase-terms-main/purhcase-terms-main.component';
import { ParameterListComponent } from './purchase-terms/parameter-list/parameter-list.component';
import { TemplateListComponent } from './purchase-terms/template-list/template-list.component';
import { ParameterCreateComponent } from './purchase-terms/parameter-create/parameter-create.component';
import { TemplateCreateComponent } from './purchase-terms/template-create/template-create.component';
import { RoomLabelPrintComponent } from './room-label-print/room-label-print.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationCreateComponent,
    LegalEntityListComponent,
    LegalEntityCreateComponent,
    RegionListComponent,
    RegionCreateComponent,
    TaxListComponent,
    TaxCreateComponent,
    DepartmentListComponent,
    DepartmentCreateComponent,
    SubdepartmentListComponent,
    SubdepartmentCreateComponent,
    DesignationListComponent,
    DesignationCreateComponent,
    UomListComponent,
    UomCreateComponent,
    CurrencyCodeListComponent,
    CurrencyCodeCreateComponent,
    BuildingComponent,
    BuildingBlockCreateComponent,
    BuildingFloorCreateComponent,
    BuildingRoomCreateComponent,
    BuildingSegmentCreateComponent,
    LocationListComponent,
    LocationCreateComponent,
    RegistrationPopupComponent,
    ItemMasterComponent,
    ItemCategoryComponent,
    ModuleListComponent,
    ItemMasterListComponent,
    ItemTypeComponent,
    ItemsCategoryComponent,
    ItemTypeCreateComponent,
    ItemBranchMappingComponent,
    ModuleCreateComponent,
    ItemMasterCreateComponent,
    ItemsCategoryCreateComponent,
    ItemCategoryCreateComponent,
    DepartmentSubdepartmentCreateComponent,
    BusinessPartnerListComponent,
    BusinessPartnerCreateComponent,
    BusinessPartnerSiteCreateComponent,
    BusinessPartnerContactCreateComponent,
    BusinessPartnerRegCreateComponent,
    PurhcaseTermsMainComponent,
    ParameterListComponent,
    TemplateListComponent,
    ParameterCreateComponent,
    TemplateCreateComponent,
    RoomLabelPrintComponent
  ],
  imports: [
    SettingsMasterRoutingModule,
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
export class SettingsMasterModule { }
