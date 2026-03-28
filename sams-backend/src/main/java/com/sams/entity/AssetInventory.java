package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_inventory", schema = "dashboard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_inventory_id")
    private Long assetInventoryId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "total_assets_count")
    private Long totalAssetsCount;

    @Column(name = "total_purchase_cost")
    private Double totalPurchaseCost;

    @Column(name = "current_value_cost")
    private Double currentValueCost;

    @Column(name = "critical_assets_count")
    private Long criticalAssetsCount;

    @Column(name = "non_critical_assets_count")
    private Long nonCriticalAssetsCount;

    @Column(name = "exceed_maint_threshold_limit")
    private Long exceedMaintThresholdLimit;

    @Column(name = "asset_category_chart")
    private String assetCategoryChart;

    @Column(name = "asset_sub_category_chart")
    private String assetSubCategoryChart;

    @Column(name = "asset_ownership_chart")
    private String assetOwnershipChart;

    @Column(name = "asset_current_age_chart")
    private String assetCurrentAgeChart;

    @Column(name = "asset_remaining_age_chart")
    private String assetRemainingAgeChart;

    @Column(name = "asset_status_chart")
    private String assetStatusChart;

    @Column(name = "asset_condition_chart")
    private String assetConditionChart;

    @Column(name = "loaned_out_external_count")
    private Long loanedOutExternalCount;

    @Column(name = "loaned_out_internal_count")
    private Long loanedOutInternalCount;

}