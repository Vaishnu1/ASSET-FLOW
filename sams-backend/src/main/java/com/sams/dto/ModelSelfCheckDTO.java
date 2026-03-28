package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelSelfCheckDTO {
    private Long modelSelfCheckId;
    private Long orgId;
    private Long modelId;
    private String defectType;
    private String defectTag;
    private String defectQuestion;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}