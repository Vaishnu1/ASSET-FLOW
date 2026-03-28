package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkFlowApprovalDTO {
    private Long workFlowApprovalId;
    private Long orgId;
    private Long transactionId;
    private String transactionNo;
    private String transactionRemarks;
    private String transactionSource;
    private Long workFlowDescId;
    private Long workFlowHierarchyHdrId;
    private String levelName;
    private Long levelSeqNo;
    private String levelApprovalStatus;
    private Long employeeId1;
    private String condition1;
    private Long employeeId2;
    private String condition2;
    private Long employeeId3;
    private String employee1ApprovalStatus;
    private String employee2ApprovalStatus;
    private String employee3ApprovalStatus;
    private Boolean employee1ReadFlag;
    private Boolean employee2ReadFlag;
    private Boolean employee3ReadFlag;
    private Long approvalSupercededBy;
    private LocalDateTime approvalSupercededDate;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String processStatus;
}