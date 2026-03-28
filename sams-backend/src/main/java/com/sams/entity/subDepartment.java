package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sub_department", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class subDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "sub_department_name")
    private String subDepartmentName;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "sub_dep_employee_name")
    private String subDepEmployeeName;

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

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "log_in_user_org_id")
    private Long logInUserOrgId;

    @Column(name = "log_in_user_loc_id")
    private Long logInUserLocId;

    @Column(name = "log_in_user_id")
    private Long logInUserId;

    @Column(name = "sub_dep_email_id")
    private String subDepEmailId;

    @Column(name = "sub_dep_contact_no")
    private String subDepContactNo;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "sub_department_code")
    private String subDepartmentCode;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}