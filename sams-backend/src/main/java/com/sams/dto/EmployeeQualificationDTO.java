package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeQualificationDTO {
    private Long employeeQualificationId;
    private Long employeeId;
    private String qualificationNo;
    private String qualificationName;
    private String university;
    private String board;
    private LocalDateTime startDate;
    private LocalDateTime completedDate;
    private Long yearOfPassing;
    private Double percentage;
    private String documentSubmitted;
    private String documentInfo;
    private String status;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}