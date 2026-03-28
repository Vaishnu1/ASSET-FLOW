package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_assignee", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetAssignee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_assignee_id")
    private Long assetAssigneeId;

    @Column(name = "assigned_to_emp_id")
    private Long assignedToEmpId;

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

    @Column(name = "start_dt_disp")
    private String startDtDisp;

    @Column(name = "end_dt_disp")
    private String endDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_d_t_disp")
    private String updatedDTDisp;

    @Column(name = "assignee_type_name")
    private String assigneeTypeName;

    @Column(name = "assigned_person_contact_number")
    private String assignedPersonContactNumber;

    @Column(name = "assigned_person_email")
    private String assignedPersonEmail;

    @Column(name = "assign_to_emp_name")
    private String assignToEmpName;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "department_id")
    private String departmentId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "mode")
    private String mode;

    @Column(name = "status")
    private String status;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_by_id")
    private Long createdById;

    @Column(name = "assigned_volume_license_qty")
    private Integer assignedVolumeLicenseQty;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "primary_technician")
    private Boolean primaryTechnician;

    @Column(name = "secondary_technician")
    private Boolean secondaryTechnician;

    @Column(name = "emp_code")
    private String empCode;

    @Column(name = "pm_pa_technician")
    private Boolean pmPaTechnician;

    @Column(name = "qa_technician")
    private Boolean qaTechnician;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}