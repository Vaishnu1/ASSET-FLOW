package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelTechnicalSpecialistDTO {
    private Long modelSpecialistId;
    private Long modelId;
    private String specialistOrgType;
    private Long specialistId;
    private String specialistName;
    private String extEngineerOrgName;
    private String extEngineerContactNo;
    private String extEngineerEmailId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}