package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCodeChangeReqDTO {
    private Long assetCodeChangeReqId;
    private Long orgId;
    private Long locationId;
    private Long assetId;
    private String assetCode;
    private String newAssetCode;
    private String reason;
    private String newCeidStatus;
    private Boolean active;
    private String requestRaisedBy;
    private LocalDateTime requestRaisedDt;
    private String approvedOrRejectedBy;
    private LocalDateTime approvedOrRejectedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}