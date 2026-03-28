package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetPhysicalAuditHdrDTO {
    private Long assetPhysicalAuditHdrId;
    private Long orgId;
    private Long locationId;
    private String physicalAuditName;
    private LocalDateTime physicalAuditDate;
    private Long assetAuditStatusId;
    private Boolean active;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String auditType;
}