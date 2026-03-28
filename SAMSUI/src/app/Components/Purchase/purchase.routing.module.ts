import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetManufacturerCreateComponent } from './asset-manufacturer-create/asset-manufacturer-create.component';
import { ManufacturerListComponent } from '../Master/assetMain/manufacturer-list/manufacturer-list.component';
import { SupplierCreateComponent } from '../Master/supplier/supplier-create/supplier-create.component';
import { SupplierListComponent } from '../Master/supplier/supplier-list/supplier-list.component';
import { PurchaseOrderCreateComponent } from './purchase-order-create/purchase-order-create.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseRequestCreateComponent } from './purchase-request-create/purchase-request-create.component';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
import { PurchaseRequestViewComponent } from './purchase-request-view/purchase-request-view.component';


const routes: Routes = [
  { path: 'manufacturer', component: ManufacturerListComponent },
  { path: 'manufacturerSupplierCreate/:pId/:mode', component: AssetManufacturerCreateComponent },
  { path: 'supplier', component: SupplierListComponent },
  { path: 'supplierCreate/:pId/:mode', component: SupplierCreateComponent },
  { path: 'purchaseRequestList', component: PurchaseRequestListComponent },
  { path: 'purchaseRequestCreate/:pId/:mode', component: PurchaseRequestCreateComponent },
  { path: 'purchaseRequestView/:pId/:mode', component: PurchaseRequestViewComponent },
  { path: 'purchaseOrderList', component: PurchaseOrderListComponent },
  { path: 'purchaseOrderCreate/:pId/:mode', component: PurchaseOrderCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
