package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CheckPointTestEquipmentDTO {
    private Long testEqptId;
    private Long checkPointsId;
    private Long srId;
    private String srNo;
    private Long assetId;
    private String assetCode;
    private Long modelId;
    private String modelName;
    private Long assetGroupId;
    private String assetGroupName;
    private Long manufacturerId;
    private String manufacturerName;
    private LocalDateTime lastPaDoneDate;
    private LocalDateTime dueDate;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}