package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_flow_reject", schema = "workflow")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlowReject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_flow_reject_id")
    private Long workFlowRejectId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_no")
    private String transactionNo;

    @Column(name = "transaction_remarks")
    private String transactionRemarks;

    @Column(name = "transaction_source")
    private String transactionSource;

    @Column(name = "work_flow_desc_id")
    private Long workFlowDescId;

    @Column(name = "work_flow_hierarchy_hdr_id")
    private Long workFlowHierarchyHdrId;

    @Column(name = "level_name")
    private String levelName;

    @Column(name = "level_seq_no")
    private Long levelSeqNo;

    @Column(name = "level_approval_status")
    private String levelApprovalStatus;

    @Column(name = "employee_id_1")
    private Long employeeId1;

    @Column(name = "condition_1")
    private String condition1;

    @Column(name = "employee_id_2")
    private Long employeeId2;

    @Column(name = "condition_2")
    private String condition2;

    @Column(name = "employee_id_3")
    private Long employeeId3;

    @Column(name = "employee_1_approval_status")
    private String employee1ApprovalStatus;

    @Column(name = "employee_2_approval_status")
    private String employee2ApprovalStatus;

    @Column(name = "employee_3_approval_status")
    private String employee3ApprovalStatus;

    @Column(name = "reject_remarks")
    private String rejectRemarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}