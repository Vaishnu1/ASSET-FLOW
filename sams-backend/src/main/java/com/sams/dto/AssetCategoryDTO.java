package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCategoryDTO {
    private Long id;
    private Long assetCategoryId;
    private Long orgId;
    private String assetCategoryName;
    private String businessType;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private String columnName;
    private String direction;
    private Boolean maintenanceInchargeRequired;
    private Boolean specification;
    private Boolean depreciation;
    private Boolean modelItems;
    private Boolean document;
    private Boolean selfAnalysis;
    private Boolean additionalInfo;
    private Boolean checkList;
    private Boolean solutionBank;
    private Long assetId;
    private Boolean technicalSpecelist;
    private String inventoryModule;
    private Boolean maintenanceSchedule;
    private Boolean childModel;
}