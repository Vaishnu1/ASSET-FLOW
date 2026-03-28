package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_department_dtl", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class departmentDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "depart_faculty_id")
    private Long departFacultyId;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "faculty_contact_no")
    private String facultyContactNo;

    @Column(name = "faculty_email_id")
    private String facultyEmailId;

    @Column(name = "active")
    private String active;

    @Column(name = "active_disp")
    private Boolean activeDisp;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}