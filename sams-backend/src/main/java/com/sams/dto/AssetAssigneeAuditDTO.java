package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetAssigneeAuditDTO {
    private Long assetAssigneId;
    private String mode;
    private Long assignedToEmpId;
    private Long orgId;
    private Long assetId;
    private Long assigneeTypeId;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private Boolean defaultPersonIncharge;
    private Boolean defaultSr;
    private Boolean active;
    private Long departmentId;
    private String approvalStatus;
    private Long createdById;
    private Long userId;
    private String rejectReason;
    private Long assignedVolumeLicenseQty;
    private LocalDateTime createdDt;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean primaryTechnician;
    private Boolean secondaryTechnician;
    private String employeeCode;
    private Boolean pmPaTechnician;
    private Boolean qaTechnician;
    private LocalDateTime auditCreatedDt;
}