package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetRelocationDTO {
    private Long id;
    private Long assetRelocateId;
    private Integer relocateBatchNo;
    private Long sourceLocId;
    private String sourceLocName;
    private Long sourceDepId;
    private String sourceDepName;
    private Long sourceSubDepId;
    private String sourceSubDepName;
    private Long relocateLocId;
    private String relocateLocName;
    private Long relocateDepId;
    private String relocateDepName;
    private Long relocateSubDepId;
    private String relocateSubDepName;
    private String requestedBy;
    private LocalDateTime requestedDt;
    private String requestedDtDisp;
    private String remarks;
    private LocalDateTime approvedDt;
    private String approvedDtDisp;
    private String approvedBy;
    private Integer relocateStatus;
    private String assetCode;
    private Long assetHdrId;
    private Integer relocateAssetCode;
    private Boolean volumeLicensePresent;
    private Long previousStatusId;
    private String relocateStatusName;
    private String primaryEnggName;
    private Long primaryEnggNameId;
    private String secondaryEnggName;
    private Long secondaryEnggNameId;
}