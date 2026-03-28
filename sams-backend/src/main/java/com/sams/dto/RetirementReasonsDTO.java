package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RetirementReasonsDTO {
    private Long retirementReasonsId;
    private Long orgId;
    private String retirementReasonName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}