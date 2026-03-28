package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BuildingFloorDTO {
    private Long buildingFloorId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String floorName;
    private Long blockId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}