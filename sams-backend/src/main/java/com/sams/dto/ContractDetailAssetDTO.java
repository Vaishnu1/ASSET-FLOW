package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ContractDetailAssetDTO {
    private Long id;
    private Long contractAssetId;
    private Long contractHdrId;
    private Long assetHdrId;
    private Boolean active;
    private Long modelId;
    private String modelName;
    private String assetCode;
    private String assetGroupName;
    private String manufacturerName;
    private String description;
    private String equipmentCode;
    private Boolean contractAlreadyExistForPeriod;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
    private Integer serialNo;
    private Integer totalPurchaseAmt;
    private String subCategoryName;
    private String excludedServices;
    private String includedServices;
    private Integer contractAmnt;
}