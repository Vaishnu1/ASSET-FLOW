package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrTrainingEmployeeDTO {
    private Long srTrainingEmpId;
    private Long orgId;
    private Long srId;
    private Long srTrainingId;
    private Long employeeId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}