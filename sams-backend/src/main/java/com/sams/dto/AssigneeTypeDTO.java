package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssigneeTypeDTO {
    private Long assigneeTypeId;
    private Long orgId;
    private String assigneeType;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
    private String updatedBy;
}