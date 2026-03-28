package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_employee_experience", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_experience_id")
    private Long employeeExperienceId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "address")
    private String address;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "designation")
    private String designation;

    @Column(name = "salary_drawn")
    private Long salaryDrawn;

    @Column(name = "reference_details")
    private String referenceDetails;

    @Column(name = "document_submitted")
    private String documentSubmitted;

    @Column(name = "document_info")
    private String documentInfo;

    @Column(name = "experience_no")
    private Long experienceNo;

    @Column(name = "qualification_no")
    private Long qualificationNo;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}