package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkFlowHierarchyHdrDTO {
    private Long workFlowHierarchyHdrId;
    private Long orgId;
    private Long locationId;
    private Long processId;
    private String processName;
    private String workFlowName;
    private Long workFlowDescId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}