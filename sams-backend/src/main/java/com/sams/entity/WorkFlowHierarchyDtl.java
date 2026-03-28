package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_flow_hierarchy_dtl", schema = "workflow")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlowHierarchyDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_flow_hierarchy_dtl_id")
    private Long workFlowHierarchyDtlId;

    @Column(name = "work_flow_hierarchy_hdr_id")
    private Long workFlowHierarchyHdrId;

    @Column(name = "level_name")
    private String levelName;

    @Column(name = "level_seq_no")
    private Long levelSeqNo;

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

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "process_status")
    private String processStatus;

    @Column(name = "approve_without_unit_price")
    private Boolean approveWithoutUnitPrice;

    @Column(name = "approve_without_supplier")
    private Boolean approveWithoutSupplier;

    @Column(name = "work_flow_process_status_id")
    private Long workFlowProcessStatusId;

}