package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupDTO {
    private Long id;
    private Long assetGroupId;
    private String assetGroupName;
    private String assetGroupDesc;
    private Long assetTypeId;
    private String assetTypeName;
    private Long assetCategoryId;
    private String assetCategoryName;
    private Long subCategoryId;
    private String subCategoryName;
    private Long orgId;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private LocalDateTime createdDt;
    private String updatedDtDisp;
    private String orgName;
    private String frequency1;
    private String frequency2;
    private String frequency3;
    private String maintenanceStrategy;
    private String criticalNature;
    private String emScore;
    private Boolean childAsset;
    private String assetCustomFieldValue;
    private String assetGroupAttribute1;
    private String assetGroupAttribute2;
    private String assetGroupAttribute3;
    private String assetGroupAttribute4;
    private String assetGroupAttribute5;
    private String columnName;
    private String direction;
    private Boolean specification;
    private String deviceCode;
    private String deviceConcept;
    private String assetGroupCode;
}