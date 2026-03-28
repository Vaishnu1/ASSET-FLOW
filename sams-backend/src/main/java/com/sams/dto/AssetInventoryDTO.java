package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetInventoryDTO {
    private Long assetInventoryId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long assetCategoryId;
    private String assetCategoryName;
    private Long assetSubCategoryId;
    private String assetSubCategoryName;
    private Long totalAssetsCount;
    private Double totalPurchaseCost;
    private Double currentValueCost;
    private Long criticalAssetsCount;
    private Long nonCriticalAssetsCount;
    private Long exceedMaintThresholdLimit;
    private String assetCategoryChart;
    private String assetSubCategoryChart;
    private String assetOwnershipChart;
    private String assetCurrentAgeChart;
    private String assetRemainingAgeChart;
    private String assetStatusChart;
    private String assetConditionChart;
    private Long loanedOutExternalCount;
    private Long loanedOutInternalCount;
}