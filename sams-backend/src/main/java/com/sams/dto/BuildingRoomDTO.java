package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BuildingRoomDTO {
    private Long buildingRoomId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String roomName;
    private String roomDesc;
    private Long blockId;
    private Long floorId;
    private Long segmentId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}