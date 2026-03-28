package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetSubCategoryDTO {
    private Long id;
    private Long subCategoryId;
    private Long orgId;
    private String subCategoryName;
    private Long categoryId;
    private String categoryName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private Integer expectedLifeInYears;
    private Integer maintainanceThresholdPer;
    private Long DepreciationMethodId;
    private String DepreciationMethodName;
    private Integer rateOfDepreciation;
    private Integer scrapValuePer;
    private String assetSubCategoryCode;
}