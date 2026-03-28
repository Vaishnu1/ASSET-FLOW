package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PhysicalAuditNewlyFoundDTO {
    private Long newlyFoundAssetId;
    private Long assetPhysicalAuditHdrId;
    private String assetCode;
    private String model;
    private String departmentName;
    private String subDepartment;
    private String assetStatus;
    private String blockName;
    private String floorName;
    private String roomName;
    private String assetCondition;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String manufacturer;
    private Long assetConditionId;
    private Long assetStatusId;
    private String serialNumber;
    private String assetGroup;
    private Long roomId;
}