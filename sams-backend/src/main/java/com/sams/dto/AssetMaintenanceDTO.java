package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetMaintenanceDTO {
    private Long assetMaintenanceId;
    private Long orgId;
    private Long locationId;
    private Long assetCategoryId;
    private String assetCategoryName;
    private Long assetSubCategoryId;
    private String assetSubCategoryName;
    private Long departmentId;
    private String departmentName;
    private Long openServiceRequests;
    private Long openBmRequests;
    private Long openCriticalBmRequests;
    private Long missedPmRequests;
    private Long missedPaRequests;
    private String topAffectedSubcategory;
    private Long topAffectedBreakdownCount;
    private LocalDateTime summaryMonth;
    private String bmAgeingJson;
    private String recurringBreakdowns;
    private String maintenanceCostBreakdown;
    private String exceedingSlaForBm;
    private String mttrDistribution;
    private String mtbfDistribution;
}