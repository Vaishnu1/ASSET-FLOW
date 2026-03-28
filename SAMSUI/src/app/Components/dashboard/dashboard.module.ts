import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { MaterialModule } from '../../@shared/material.module';
import { CommonModule } from '@angular/common';
import { OpenSRChartComponent } from './charts/open-srchart/open-srchart.component';
import { OpenSRCriticalityComponent } from './charts/open-srcriticality/open-srcriticality.component';
import { WinByCategoryComponent } from './popUp/win-by-category/win-by-category.component';
import { WinByModelComponent } from './popUp/win-by-model/win-by-model.component';
import { MissedSchedulingComponent } from './charts/missed-scheduling/missed-scheduling.component';
import { BreakDownAgingComponent } from './charts/break-down-aging/break-down-aging.component';
import { ActiveAssetsComponent } from './charts/active-assets/active-assets.component';
import { WarrantyExpiringComponent } from './charts/warranty-expiring/warranty-expiring.component';
import { WarrantyDetailsComponent } from './charts/warranty-details/warranty-details.component';
import { InactiveAssetsComponent } from './charts/inactive-assets/inactive-assets.component';
import { RegionWiseServicerequestComponent } from './charts/region-wise-sr/region-wise-servicerequest/region-wise-servicerequest.component';
import { CriticalNoncriticalCountComponent } from './charts/critical-noncritical-count/critical-noncritical-count.component';
import { RentalLeaseDetailsComponent } from './charts/rental-lease-details/rental-lease-details.component';
import { CategoryWiseAssetInfoComponent } from './category-wise-asset-info/category-wise-asset-info.component';
import { SubcategoryWiseAssetInfoComponent } from './subcategory-wise-asset-info/subcategory-wise-asset-info.component';
import { MonthwiseRetiredDisposedComponent } from './charts/monthwise-retired-disposed/monthwise-retired-disposed.component';
import { SelectRetiredDisposedOptionComponent } from './select-retired-disposed-option/select-retired-disposed-option.component';
import { ComparisonBm3monthsComponent } from './charts/comparison-bm3months/comparison-bm3months.component';
import { RetireDisposalCategoryWiseCountComponent } from './retire-disposal-category-wise-count/retire-disposal-category-wise-count.component';
import { RetireDisposalSubCategoryWiseCountComponent } from './retire-disposal-sub-category-wise-count/retire-disposal-sub-category-wise-count.component';
import { DashBoardDurationComponent } from './dash-board-duration/dash-board-duration.component';
import {AllAssetsComponent } from './charts/all-assets/all-assets.component'
import { DashboardMainV1Component } from './dashboard-main-v1/dashboard-main-v1.component';
import { DashboardMainV2Component } from './dashboard-main-v2/dashboard-main-v2.component';

@NgModule({
  declarations: [
    DashboardMainComponent,
    MissedSchedulingComponent,
    BreakDownAgingComponent,
    ActiveAssetsComponent,
    WarrantyExpiringComponent,
    WarrantyDetailsComponent,
    InactiveAssetsComponent,
    RegionWiseServicerequestComponent,
    CriticalNoncriticalCountComponent,
    RentalLeaseDetailsComponent,
    OpenSRChartComponent,
    DashBoardDurationComponent,
    RetireDisposalSubCategoryWiseCountComponent,
    RetireDisposalCategoryWiseCountComponent,
    ComparisonBm3monthsComponent,
    SelectRetiredDisposedOptionComponent,
    MonthwiseRetiredDisposedComponent,
    SubcategoryWiseAssetInfoComponent,
    CategoryWiseAssetInfoComponent,
    OpenSRCriticalityComponent,
    WinByCategoryComponent,
    WinByModelComponent,
    AllAssetsComponent,
    DashboardMainV1Component,
    DashboardMainV2Component
],
  imports: [
    DashboardRoutingModule,
    MaterialModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
