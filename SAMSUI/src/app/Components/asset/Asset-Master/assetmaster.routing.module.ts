import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetCategoryListComponent } from './asset-category-list/asset-category-list.component';
import { AssetGroupCreateComponent } from './asset-group-create/asset-group-create.component';
import { BatchAssetHdrCreateComponent } from './batch-asset/batch-asset-hdr-create/batch-asset-hdr-create.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { ModelCreateComponent } from './Model/model-create/model-create.component';
import { ModelListComponent } from './Model/model-list/model-list.component';
import { ModelViewComponent } from './Model/model-view/model-view.component';


const routes: Routes = [
  { path: 'assetCategory', component:AssetCategoryListComponent},
  { path: 'batchHdrCreate/:pId/:mode', component: BatchAssetHdrCreateComponent},
  { path: 'assetGroupCreate/:pId/:mode', component: AssetGroupCreateComponent},
  { path: 'model', component: ModelListComponent },
  { path: 'modelView/:modelId', component: ModelViewComponent },
  { path: 'modelCreate/:pId/:mode/:tab', component: ModelCreateComponent },
  { path: 'customerCreate/:pId/:mode', component: CustomerCreateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetMasterRoutingModule {}
