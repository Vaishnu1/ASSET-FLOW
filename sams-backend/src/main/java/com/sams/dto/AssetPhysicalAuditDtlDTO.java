package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetPhysicalAuditDtlDTO {
    private Long assetPhysicalAuditDtlId;
    private Long assetPhysicalAuditHdrId;
    private Long assetHdrId;
    private String assetCode;
    private Long departmentId;
    private String departmentName;
    private String subDepartment;
    private Long subDepartmentId;
    private Long assetStatusId;
    private Long assetConditionId;
    private Long newDepartmentId;
    private String newDepartmentName;
    private String newSubDepartment;
    private Long newSubDepartmentId;
    private Long newAssetStatusId;
    private Long newAssetConditionId;
    private Long statusTypeId;
    private Long newStatusTypeId;
    private Long blockId;
    private String blockName;
    private Long floorId;
    private String floorName;
    private Long segmentId;
    private String segmentName;
    private Long roomId;
    private String roomName;
    private Long newBlockId;
    private String newBlockName;
    private Long newFloorId;
    private String newFloorName;
    private Long newSegmentId;
    private String newSegmentName;
    private Long newRoomId;
    private String newRoomName;
    private Long ageCriteria;
    private String assetAge;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}