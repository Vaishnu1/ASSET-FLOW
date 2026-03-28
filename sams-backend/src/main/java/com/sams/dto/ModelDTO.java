package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelDTO {
    private Long modelId;
    private Long orgId;
    private String modelName;
    private String modelNo;
    private Long businessPartnerId;
    private Long assetCategoryId;
    private Long assetTypeId;
    private Long assetSubCategoryId;
    private Long assetGroupId;
    private Boolean volumeLicensePresent;
    private String installationType;
    private Boolean trackIndividualLicenses;
    private Double maintenanceThresholdPercentage;
    private Double expectedLifeInYears;
    private Long depreciationMethodId;
    private Double rateOfDepreciation;
    private Double scrapValuePercentage;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}