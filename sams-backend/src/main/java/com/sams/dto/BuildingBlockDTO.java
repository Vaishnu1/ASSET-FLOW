package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BuildingBlockDTO {
    private Long buildingBlockId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String blockName;
    private String blockDesc;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}