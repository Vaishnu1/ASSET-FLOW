package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetAssigneeAuditOldDTO {
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
    private String assignedToEmpName;
    private String assignedToEmpContactNumber;
    private String assignedToEmpEmail;
    private String departmentName;
    private String assigneeTypeName;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}