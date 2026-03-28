package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_employee_qualification", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeQualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_qualification_id")
    private Long employeeQualificationId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "qualification_no")
    private String qualificationNo;

    @Column(name = "qualification_name")
    private String qualificationName;

    @Column(name = "university")
    private String university;

    @Column(name = "board")
    private String board;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "completed_date")
    private LocalDateTime completedDate;

    @Column(name = "year_of_passing")
    private Long yearOfPassing;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "document_submitted")
    private String documentSubmitted;

    @Column(name = "document_info")
    private String documentInfo;

    @Column(name = "status")
    private String status;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}