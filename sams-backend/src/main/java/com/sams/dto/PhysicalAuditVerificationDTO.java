package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PhysicalAuditVerificationDTO {
    private Long assetPhysicalVerificationDtlId;
    private Long assetPhysicalAuditHdrId;
    private Long assetPhysicalAuditDtlIdNew;
    private Long assetHdrId;
    private String assetCode;
    private Long departmentId;
    private String departmentName;
    private Long subDepartmentId;
    private String subDepartment;
    private Long assetStatusId;
    private String functionalStatus;
    private Long blockId;
    private String blockName;
    private Long floorId;
    private String floorName;
    private Long segmentId;
    private String segmentName;
    private Long roomId;
    private String roomName;
    private Long ageCriteria;
    private String assetAge;
    private Long assetConditionId;
    private Long statusTypeId;
    private String assetImageFilePath;
    private Boolean varianceFlag;
    private Boolean newlyFoundAsset;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String auditRemarks;
    private String latitude;
    private String longitude;
    private String address;
    private String serialNumber;
}