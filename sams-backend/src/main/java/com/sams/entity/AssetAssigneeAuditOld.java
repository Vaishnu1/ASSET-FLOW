package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_assignee_audit_old", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetAssigneeAuditOld {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_assigne_id")
    private Long assetAssigneId;

    @Column(name = "mode")
    private String mode;

    @Column(name = "assigned_to_emp_id")
    private Long assignedToEmpId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "assignee_type_id")
    private Long assigneeTypeId;

    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "default_person_incharge")
    private Boolean defaultPersonIncharge;

    @Column(name = "default_sr")
    private Boolean defaultSr;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "created_by_id")
    private Long createdById;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "assigned_to_emp_name")
    private String assignedToEmpName;

    @Column(name = "assigned_to_emp_contact_number")
    private String assignedToEmpContactNumber;

    @Column(name = "assigned_to_emp_email")
    private String assignedToEmpEmail;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "assignee_type_name")
    private String assigneeTypeName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}