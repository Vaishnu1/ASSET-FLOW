package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailProcessesDTO {
    private Long processId;
    private String processName;
    private Long moduleId;
    private Boolean active;
    private Long orgId;
    private Long locationId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}