package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ProcessStatusDTO {
    private Long processStatusId;
    private String processStatusName;
    private Long processId;
    private String processName;
    private Long seqProcessStatusId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}