package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetAssigneeDTO {
    private Long id;
    private Long assetAssigneeId;
    private Long assignedToEmpId;
    private Long assetId;
    private Long assigneeTypeId;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private Boolean defaultPersonIncharge;
    private String startDtDisp;
    private String endDtDisp;
    private String createdDtDisp;
    private String updatedDTDisp;
    private String assigneeTypeName;
    private String assignedPersonContactNumber;
    private String assignedPersonEmail;
    private String assignToEmpName;
    private String departmentName;
    private String departmentId;
    private String assetCode;
    private String createdBy;
    private String mode;
    private String status;
    private String rejectReason;
    private Long userId;
    private Long createdById;
    private Integer assignedVolumeLicenseQty;
    private String approvalStatus;
    private Boolean primaryTechnician;
    private Boolean secondaryTechnician;
    private String empCode;
    private Boolean pmPaTechnician;
    private Boolean qaTechnician;
}