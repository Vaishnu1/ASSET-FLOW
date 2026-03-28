import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetStockCreateComponent } from './assetStock/asset-stock-create/asset-stock-create.component';
import { AssetStockListComponent } from './assetStock/asset-stock-list/asset-stock-list.component';
import { GrnCreateComponent } from './grn/grn-create/grn-create.component';
import { GrnListComponent } from './grn/grn-list/grn-list.component';
import { ItemRegisterListComponent } from './item-register-list/item-register-list.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemTypeComponent } from '../settings/Organization/item-master-organization/item-type/item-type.component';
import { StockTransferCreateComponent } from './stock-transfer-create/stock-transfer-create.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { StockenquiryListComponent } from './stockEnquiry/stockenquiry-list/stockenquiry-list.component';
import { StockIndentCreateComponent } from './stockIndent/stock-indent-create/stock-indent-create.component';
import { StockIndentListComponent } from './stockIndent/stock-indent-list/stock-indent-list.component';
import { StoreListComponent } from './store/store-list/store-list.component';
import { RtvComponent } from './rtv/rtv.component';
import { RtvCreateComponent } from './rtv/rtv-create/rtv-create.component';

const routes: Routes = [
  { path: 'itemMaster', component: ItemTypeComponent },
  { path: 'item', component: ItemListComponent },
  { path: 'itemCreate/:pId/:mode', component: ItemCreateComponent },
  { path: 'storeList', component: StoreListComponent},
  { path: 'grn', component: GrnListComponent },
  { path: 'grnCreate/:pId/:mode', component:GrnCreateComponent},
  { path: 'stockEnquiryList', component:StockenquiryListComponent},
  { path: 'stockIndentList', component: StockIndentListComponent},
  { path: 'stockIndentCreate/:pId/:mode', component: StockIndentCreateComponent}, 
  { path: 'stockTransferList', component: StockTransferComponent},
  { path: 'stockTransferCreate/:pId/:mode', component: StockTransferCreateComponent},
  { path: 'assetStockTransferList', component: AssetStockListComponent},
  { path: 'assetStockCreate/:pId/:mode', component: AssetStockCreateComponent},
  { path: 'itemTransactionList', component:ItemRegisterListComponent},
  { path: 'returnToVendor',component: RtvComponent},
  { path: 'rtvCreate/:pId/:mode', component: RtvCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
