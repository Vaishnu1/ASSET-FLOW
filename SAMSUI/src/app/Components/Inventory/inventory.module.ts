import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InventoryRoutingModule } from './inventory.routing.module';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { ItemApprovedSupplierComponent } from './item/item-approved-supplier/item-approved-supplier.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemsHistoryComponent } from './item/items-history/items-history.component';
import { StoreListComponent } from './store/store-list/store-list.component';
import { StoreDialogCreateComponent } from './store/store-dialog-create/store-dialog-create.component';
import { GrnCreateComponent } from './grn/grn-create/grn-create.component';
import { GrnListComponent } from './grn/grn-list/grn-list.component';
import { ItemRegisterViewComponent } from './stockEnquiry/item-register-view/item-register-view.component';
import { StockenquiryDtlComponent } from './stockEnquiry/stockenquiry-dtl/stockenquiry-dtl.component';
import { StockenquiryListComponent } from './stockEnquiry/stockenquiry-list/stockenquiry-list.component';
import { StockIndentCreateComponent } from './stockIndent/stock-indent-create/stock-indent-create.component';
import { StockIndentListComponent } from './stockIndent/stock-indent-list/stock-indent-list.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { StockTransferCreateComponent } from './stock-transfer-create/stock-transfer-create.component';
import { AssetStockCreateComponent } from './assetStock/asset-stock-create/asset-stock-create.component';
import { AssetStockListComponent } from './assetStock/asset-stock-list/asset-stock-list.component';
import { ItemRegisterListComponent } from './item-register-list/item-register-list.component';
import { StoreCreateComponent } from './store/store-create/store-create.component';
import { SharedModule } from 'src/app/@shared/shared.module';

import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/Services/date-time/customDateAdapter';
import { GrnDocInfoComponent } from '../Dialog-Components/inventory/grn-doc-info/grn-doc-info.component';
import { GrnStoreInfoComponent } from './grn/grn-store-info/grn-store-info.component';
import { RtvComponent } from './rtv/rtv.component';
import { RtvCreateComponent } from './rtv/rtv-create/rtv-create.component';
import { RtvGrnListComponent } from './rtv/rtv-create/rtv-grn-list/rtv-grn-list.component';

@NgModule({
  declarations: [
    ItemApprovedSupplierComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemsHistoryComponent,
    StoreListComponent,
    StoreDialogCreateComponent,
    GrnListComponent,
    GrnCreateComponent,
    ItemRegisterViewComponent,
    StockenquiryDtlComponent,
    StockenquiryListComponent,
    StockIndentListComponent,
    StockIndentCreateComponent,
    StockTransferComponent,
    StockTransferCreateComponent,
    AssetStockListComponent,
    AssetStockCreateComponent,
    ItemRegisterListComponent,
    StoreCreateComponent,
    GrnDocInfoComponent,
    GrnStoreInfoComponent,
    RtvComponent,
    RtvCreateComponent,
    RtvGrnListComponent
  
],
  imports: [
    InventoryRoutingModule,
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
export class InventoryModule { }
