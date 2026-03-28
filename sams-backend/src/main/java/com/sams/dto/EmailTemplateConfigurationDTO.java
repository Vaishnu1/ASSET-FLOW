package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailTemplateConfigurationDTO {
    private Long etcId;
    private Long orgId;
    private Long locationId;
    private Long processId;
    private Long triggerEvent;
    private Long emailTmplId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}