package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetRelocateDTO {
    private Long assetRelocateId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long relocateBatchNo;
    private Long sourceLocationId;
    private String sourceLocationName;
    private Long sourceDepId;
    private String sourceDepName;
    private Long sourceSubDepId;
    private String sourceSubDepName;
    private Long relocateLocationId;
    private String relocateLocationName;
    private Long relocateDepId;
    private String relocateDepName;
    private Long relocateSubDepId;
    private String relocateSubDepName;
    private String requestedBy;
    private LocalDateTime requestedDt;
    private Long relocateStatus;
    private String assetCode;
    private String relocateAssetCode;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String remarks;
    private Long assetId;
    private Boolean raiseWo;
    private Long previousAssetStatusId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long primaryEnggId;
    private String primaryEnggName;
    private Long secondaryEnggId;
    private String secondaryEnggName;
}