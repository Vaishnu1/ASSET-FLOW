import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetPhysicalAuditCreateComponent } from './Asset-Physical-Audit/asset-physical-audit-create/asset-physical-audit-create.component';
import { AssetPhysicalAuditEditComponent } from './Asset-Physical-Audit/asset-physical-audit-edit/asset-physical-audit-edit.component';
import { AssetPhysicalAuditListComponent } from './Asset-Physical-Audit/asset-physical-audit-list/asset-physical-audit-list.component';
import { AssetRelocationApproveRejectComponent } from './Asset-Relocation/asset-relocation-approve-reject/asset-relocation-approve-reject.component';
import { AssetRelocationListComponent } from './Asset-Relocation/asset-relocation-list/asset-relocation-list.component';
import { AssetRelocationSearchComponent } from './Asset-Relocation/asset-relocation-search/asset-relocation-search.component';
import { AssetCreateComponent } from './Asset/asset-create/asset-create.component';
import { AssetListComponent } from './Asset/asset-list/asset-list.component';
import { AssetViewComponent } from './Asset/asset-view/asset-view.component';
import { ContractCreateComponent } from './contract/contract-create/contract-create.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { GatePassCreateComponent } from './Gate-Pass/gate-pass-create/gate-pass-create.component';
import { GatePassListComponent } from './Gate-Pass/gate-pass-list/gate-pass-list.component';
import { InwardInventorySrComponent } from './inward-inventory-sr/inward-inventory-sr.component';
import { InternalLoanCreateComponent } from './Loans/internal-loan-create/internal-loan-create.component';
import { InternalLoanListComponent } from './Loans/internal-loan-list/internal-loan-list.component';
import { LoanCreateComponent } from './Loans/loan-create/loan-create.component';
import { LoanListComponent } from './Loans/loan-list/loan-list.component';
import { PreInwardInventoryCreateComponent } from './pre-inward-inventory/pre-inward-inventory-create/pre-inward-inventory-create.component';
import { PreInwardInventoryListComponent } from './pre-inward-inventory/pre-inward-inventory-list/pre-inward-inventory-list.component';
import { ServiceRequestAssetRetirementListComponent } from './service-request-asset-retirement-list/service-request-asset-retirement-list.component';
import { ServiceRequestAssetRetirementComponent } from './service-request-asset-retirement/service-request-asset-retirement.component';
import { AssetCreateV1Component } from './Asset/asset-create-v1/asset-create-v1.component';


const routes: Routes = [
  { path: 'preInwardInventory', component: PreInwardInventoryListComponent},
  { path: 'preInwardInventoryCreate/:pId/:mode', component: PreInwardInventoryCreateComponent},
  { path: 'assetCreate/:pId/:mode/:tab', component: AssetCreateComponent},    
  { path : 'inwardInventorySR', component:InwardInventorySrComponent},
  { path: 'asset', component: AssetListComponent },
  { path: 'assetRetirementCreate/:pId/:mode', component: ServiceRequestAssetRetirementComponent},
  { path: 'assetRetirement', component: ServiceRequestAssetRetirementListComponent },
  { path: 'assetRetirement/:status/:category/:subcategory', component:ServiceRequestAssetRetirementListComponent},
  { path: 'assetRelocation/:pId/:mode', component: AssetRelocationSearchComponent},
  { path: 'assetRelocationList', component: AssetRelocationListComponent},
  { path: 'assetRelocationApprove/:pId', component: AssetRelocationApproveRejectComponent},
  { path: 'assetPhysicalAudit', component: AssetPhysicalAuditListComponent},
  { path: 'assetPhysicalAuditCreate', component: AssetPhysicalAuditCreateComponent},
  { path: 'assetPhysicalAuditEdit/:pId/:locId/:mode', component: AssetPhysicalAuditEditComponent},
  { path: 'gatePassList', component: GatePassListComponent},  
  { path: 'gatePassCreate/:pId/:mode', component: GatePassCreateComponent},   
  { path: 'loanReturnList', component: LoanListComponent},
  { path: 'loanReturnRequesCreate/:pId/:mode', component: LoanCreateComponent},
  { path: 'internalLoanList', component: InternalLoanListComponent},
  { path: 'internalLoanCreate/:pId/:mode', component: InternalLoanCreateComponent},
  { path: 'contractList', component: ContractListComponent},
  { path: 'contractCreate/:pId/:mode/:source', component: ContractCreateComponent},
  { path: 'assetList/:subCategoryId/:statusId/:ownershipType', component: AssetListComponent },
  { path: 'assetDash/:categoryId/:subCategoryId/:routeId/:year', component: AssetListComponent },
  { path: 'contractList/:coverage/:expiringFrom', component: ContractListComponent},
  { path: 'assetView/:pId', component: AssetViewComponent},
  { path: 'assetCreateV1/:pId/:mode/:tab', component: AssetCreateV1Component},
  { path: 'assetListV1/status/:statusConditionId/:statusId', component: AssetListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingModule {}
