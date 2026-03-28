package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_physical_audit_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetPhysicalAuditDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_physical_audit_dtl_id")
    private Long assetPhysicalAuditDtlId;

    @Column(name = "asset_physical_audit_hdr_id")
    private Long assetPhysicalAuditHdrId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "new_department_id")
    private Long newDepartmentId;

    @Column(name = "new_department_name")
    private String newDepartmentName;

    @Column(name = "new_sub_department")
    private String newSubDepartment;

    @Column(name = "new_sub_department_id")
    private Long newSubDepartmentId;

    @Column(name = "new_asset_status_id")
    private Long newAssetStatusId;

    @Column(name = "new_asset_condition_id")
    private Long newAssetConditionId;

    @Column(name = "status_type_id")
    private Long statusTypeId;

    @Column(name = "new_status_type_id")
    private Long newStatusTypeId;

    @Column(name = "block_id")
    private Long blockId;

    @Column(name = "block_name")
    private String blockName;

    @Column(name = "floor_id")
    private Long floorId;

    @Column(name = "floor_name")
    private String floorName;

    @Column(name = "segment_id")
    private Long segmentId;

    @Column(name = "segment_name")
    private String segmentName;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "new_block_id")
    private Long newBlockId;

    @Column(name = "new_block_name")
    private String newBlockName;

    @Column(name = "new_floor_id")
    private Long newFloorId;

    @Column(name = "new_floor_name")
    private String newFloorName;

    @Column(name = "new_segment_id")
    private Long newSegmentId;

    @Column(name = "new_segment_name")
    private String newSegmentName;

    @Column(name = "new_room_id")
    private Long newRoomId;

    @Column(name = "new_room_name")
    private String newRoomName;

    @Column(name = "age_criteria")
    private Long ageCriteria;

    @Column(name = "asset_age")
    private String assetAge;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}