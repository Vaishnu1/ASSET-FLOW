import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AssetItemViewComponent } from "../Components/asset/asset-item-view/asset-item-view.component";
import { PercentageDirective } from "../Components/Common-components/percentage.directive";
import { SupplierSiteRegistrationComponent } from "../Components/Master/supplier/supplier-site-registration/supplier-site-registration.component";
import { AccessoriesCreateComponent } from "../Components/Model/subTabs/accessories-create/accessories-create.component";
import { ConsumablesCreateComponent } from "../Components/Model/subTabs/consumables-create/consumables-create.component";
import { SparepartsCreateComponent } from "../Components/Model/subTabs/spareparts-create/spareparts-create.component";
import { ViewAssetInfoDetailsComponent } from "../Components/Purchase/view-asset-info-details/view-asset-info-details.component";
import { CommonWorkflowApprovalTabComponent } from "../Components/workflow/workflowApproval/common-workflow-approval-tab/common-workflow-approval-tab.component";
import { MaterialModule } from "./material.module";

@NgModule({
    declarations: [
        CommonWorkflowApprovalTabComponent,
        AccessoriesCreateComponent,
        SparepartsCreateComponent,
        ConsumablesCreateComponent,
        AssetItemViewComponent,
        SupplierSiteRegistrationComponent,
        ViewAssetInfoDetailsComponent,
        PercentageDirective

    ],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [
        CommonWorkflowApprovalTabComponent,
        AccessoriesCreateComponent,
        SparepartsCreateComponent,
        ConsumablesCreateComponent,
        AssetItemViewComponent,
        SupplierSiteRegistrationComponent,
        ViewAssetInfoDetailsComponent,
        PercentageDirective
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class SharedModule {}