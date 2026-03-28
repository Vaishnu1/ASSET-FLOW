package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupStatCertificateDTO {
    private Long assetGroupStatId;
    private Long orgId;
    private Long assetGroupId;
    private Long certificateId;
    private String certificateName;
    private String mandatoryRequiredStage;
    private Boolean required;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}