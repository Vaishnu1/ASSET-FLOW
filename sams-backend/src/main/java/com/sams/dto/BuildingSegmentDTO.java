package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BuildingSegmentDTO {
    private Long buildingSegmentId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String segmentName;
    private String segmentDesc;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}