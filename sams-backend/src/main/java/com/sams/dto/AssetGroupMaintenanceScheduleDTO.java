package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupMaintenanceScheduleDTO {
    private Long assetGroupMaintenanceScheduleId;
    private Long orgId;
    private Long assetGroupId;
    private Long maintScheduleTypeId;
    private Long maintScheduleFrequncyId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}