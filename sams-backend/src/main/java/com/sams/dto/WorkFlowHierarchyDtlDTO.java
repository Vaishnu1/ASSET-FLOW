package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkFlowHierarchyDtlDTO {
    private Long workFlowHierarchyDtlId;
    private Long workFlowHierarchyHdrId;
    private String levelName;
    private Long levelSeqNo;
    private Long employeeId1;
    private String condition1;
    private Long employeeId2;
    private String condition2;
    private Long employeeId3;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String processStatus;
    private Boolean approveWithoutUnitPrice;
    private Boolean approveWithoutSupplier;
    private Long workFlowProcessStatusId;
}