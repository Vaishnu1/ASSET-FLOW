package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_assignee_audit", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetAssigneeAudit {

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

    @Column(name = "assigned_volume_license_qty")
    private Long assignedVolumeLicenseQty;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "primary_technician")
    private Boolean primaryTechnician;

    @Column(name = "secondary_technician")
    private Boolean secondaryTechnician;

    @Column(name = "employee_code")
    private String employeeCode;

    @Column(name = "pm_pa_technician")
    private Boolean pmPaTechnician;

    @Column(name = "qa_technician")
    private Boolean qaTechnician;

    @Column(name = "audit_created_dt")
    private LocalDateTime auditCreatedDt;

}