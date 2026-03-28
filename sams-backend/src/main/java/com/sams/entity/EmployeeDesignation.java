package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_employee_designation", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDesignation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "employee_designation_id")
    private Long employeeDesignationId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "designation_id")
    private String designationId;

    @Column(name = "designation_name")
    private String designationName;

    @Column(name = "designationfrom_date")
    private LocalDateTime designationfromDate;

    @Column(name = "designationtill_date")
    private LocalDateTime designationtillDate;

    @Column(name = "reporting_person_id")
    private Long reportingPersonId;

    @Column(name = "reporting_person_name")
    private String reportingPersonName;

    @Column(name = "status")
    private String status;

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