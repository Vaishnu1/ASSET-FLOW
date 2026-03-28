package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelDefectDTO {
    private Long modelDefectId;
    private Long orgId;
    private Long modelId;
    private String defectName;
    private String defectTag;
    private String defectCause;
    private String defectSolution;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}