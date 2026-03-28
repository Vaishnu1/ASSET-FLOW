package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailModulesDTO {
    private Long moduleId;
    private String moduleName;
    private Boolean active;
    private Long orgId;
    private Long locationId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}