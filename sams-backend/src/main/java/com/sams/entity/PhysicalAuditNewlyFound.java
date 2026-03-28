package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "physical_audit_newly_found", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalAuditNewlyFound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "newly_found_asset_id")
    private Long newlyFoundAssetId;

    @Column(name = "asset_physical_audit_hdr_id")
    private Long assetPhysicalAuditHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "model")
    private String model;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "asset_status")
    private String assetStatus;

    @Column(name = "block_name")
    private String blockName;

    @Column(name = "floor_name")
    private String floorName;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "asset_condition")
    private String assetCondition;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "asset_group")
    private String assetGroup;

    @Column(name = "room_id")
    private Long roomId;

}