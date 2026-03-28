package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetSwDtlDTO {
    private Long assetSwDtlId;
    private Long orgId;
    private Long assetHdrId;
    private String assetCode;
    private String softwareName;
    private String version;
    private String licenceKey;
    private Long noOfLicence;
    private LocalDateTime activationDt;
    private LocalDateTime expiryDt;
    private Boolean active;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}