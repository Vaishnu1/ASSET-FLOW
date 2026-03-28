package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetRetirementDTO {
    private Long assetRetireId;
    private Long orgId;
    private Long locationId;
    private Long assetId;
    private String assetCode;
    private String assetCategoryName;
    private String assetSubCategoryName;
    private Long assetConditionId;
    private Long assetRetirementStatusId;
    private String retirementNo;
    private LocalDateTime retirementDt;
    private String retirementStatus;
    private String requestedBy;
    private String requestReason;
    private String retirementRemarks;
    private Boolean salvageable;
    private Boolean buyBack;
    private Long buyBackSupplierId;
    private Long buyBackSupplierSiteId;
    private Double retireValueForBuyBack;
    private String retireRemarkForBuyBack;
    private Boolean dispose;
    private Long disposeSupplierId;
    private Double disposeValue;
    private String disposeRemarks;
    private LocalDateTime disposalDt;
    private Boolean issueGatePass;
    private Long assetPreviousStatusId;
    private Long retirementStoreId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long retirementModeId;
    private String retirementMode;
    private String rejectReason;
    private Boolean regulatoryCompliance;
}