package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetTemporaryAssigneeDTO {
    private Long assetTemporaryAssigneeId;
    private Long orgId;
    private Long locationId;
    private Long assetId;
    private Long transactionId;
    private Long processId;
    private Long fromAssigneeId;
    private Long toAssigneeId;
    private Boolean defaultPersonIncharge;
    private Long vlOldQty;
    private Long vlNewQty;
    private LocalDateTime endDt;
    private Long assigneeTypeId;
    private Boolean updateFlag;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean primaryTechnician;
    private Boolean secondaryTechnician;
}