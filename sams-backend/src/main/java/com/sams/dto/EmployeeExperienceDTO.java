package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeExperienceDTO {
    private Long employeeExperienceId;
    private Long employeeId;
    private String companyName;
    private String address;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String designation;
    private Long salaryDrawn;
    private String referenceDetails;
    private String documentSubmitted;
    private String documentInfo;
    private Long experienceNo;
    private Long qualificationNo;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}