import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PurchaseRoutingModule } from './purchase.routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
import { PurchaseRequestCreateComponent } from './purchase-request-create/purchase-request-create.component';
import { PurchaseRequestViewComponent } from './purchase-request-view/purchase-request-view.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderCreateComponent } from './purchase-order-create/purchase-order-create.component';
import { ManufacturerListComponent } from '../Master/assetMain/manufacturer-list/manufacturer-list.component';
import { SupplierListComponent } from '../Master/supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from '../Master/supplier/supplier-create/supplier-create.component';
import { AssetManufacturerCreateComponent } from './asset-manufacturer-create/asset-manufacturer-create.component';
import { ServiceCenterCreateComponent } from './service-center-create/service-center-create.component';
import { ModelsSuppliedPopUpComponent } from './models-supplied-pop-up/models-supplied-pop-up.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SupplierSiteContactCreateComponent } from '../Master/supplier/supplier-site-contact-create/supplier-site-contact-create.component';
import { SupplierSiteCreateComponent } from '../Master/supplier/supplier-site-create/supplier-site-create.component';
import { PurchaseSuppSitePopUpComponent } from './purchase-supp-site-pop-up/purchase-supp-site-pop-up.component';
import { TaxCalcforPurchaseComponent } from './tax-calcfor-purchase/tax-calcfor-purchase.component';
import { ManufacturerCreateComponent } from '../Dialog-Components/assetPopUp/manufacturer-create/manufacturer-create.component';
import { PurchaseOrderHistoryAuditComponent } from './purchase-order-history-audit/purchase-order-history-audit.component';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { DateAdapter } from '@angular/material/core';
import { PoItemAddComponent } from './po-item-add/po-item-add.component';
import { PrItemAddComponent } from './pr-item-add/pr-item-add.component';
import { PrNewItemAddComponent } from './pr-new-item-add/pr-new-item-add.component';
import { PrNewItemMsgComponent } from './pr-new-item-add/pr-new-item-msg/pr-new-item-msg.component';
import { PrPoConvertInfoComponent } from './purchase-request-list/pr-po-convert-info/pr-po-convert-info.component';
import { PrPoViewInfoComponent } from './pr-po-view-info/pr-po-view-info.component';
import { PrViewInfoComponent } from './pr-view-info/pr-view-info.component';
import { HttpClientModule } from '@angular/common/http';
// import { AngularEditorModule } from '@kolkov/angular-editor';
import { SupplierContactInfoComponent } from './supplier-contact-info/supplier-contact-info.component';
import { PoTcParameterListComponent } from './po-tc-parameter-list/po-tc-parameter-list.component';

@NgModule({
  declarations: [
    ManufacturerListComponent,
    AssetManufacturerCreateComponent,
    SupplierCreateComponent,
    SupplierListComponent,
    PurchaseRequestListComponent,
    PurchaseRequestCreateComponent,
    PurchaseRequestViewComponent,
    PurchaseOrderListComponent,
    PurchaseOrderCreateComponent,
    ModelsSuppliedPopUpComponent,
    ServiceCenterCreateComponent,
    SupplierSiteContactCreateComponent,
    SupplierSiteCreateComponent,
    PurchaseSuppSitePopUpComponent,
    TaxCalcforPurchaseComponent,
    ManufacturerCreateComponent,
    PurchaseOrderHistoryAuditComponent,
    PoItemAddComponent,
    PrItemAddComponent,
    PrNewItemAddComponent,
    PrNewItemMsgComponent,
    PrPoConvertInfoComponent,
    PrPoViewInfoComponent,
    PrViewInfoComponent,
    SupplierContactInfoComponent,
    PoTcParameterListComponent
],
  imports: [
    PurchaseRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule,
    HttpClientModule, 
    // AngularEditorModule
  ],
  providers:
  [
    CustomDateAdapter, // so we could inject services to 'CustomDateAdapter'
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Parse MatDatePicker Format
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseModule { }
