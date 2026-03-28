package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeSkillDTO {
    private Long employeeSkillId;
    private Long employeeId;
    private String skillName;
    private Double noOfYears;
    private String remarks;
    private Long level;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}