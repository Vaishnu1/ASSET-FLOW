package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MaintenanceStrategyDTO {
    private Long maintenanceStrategyId;
    private Long orgId;
    private String maintenanceStrategyName;
    private String maintenanceStrategyType;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}