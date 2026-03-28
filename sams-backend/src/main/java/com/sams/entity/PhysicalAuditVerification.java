package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "physical_audit_verification", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalAuditVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_physical_verification_dtl_id")
    private Long assetPhysicalVerificationDtlId;

    @Column(name = "asset_physical_audit_hdr_id")
    private Long assetPhysicalAuditHdrId;

    @Column(name = "asset_physical_audit_dtl_id_new")
    private Long assetPhysicalAuditDtlIdNew;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "functional_status")
    private String functionalStatus;

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

    @Column(name = "age_criteria")
    private Long ageCriteria;

    @Column(name = "asset_age")
    private String assetAge;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "status_type_id")
    private Long statusTypeId;

    @Column(name = "asset_image_file_path")
    private String assetImageFilePath;

    @Column(name = "variance_flag")
    private Boolean varianceFlag;

    @Column(name = "newly_found_asset")
    private Boolean newlyFoundAsset;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "audit_remarks")
    private String auditRemarks;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "address")
    private String address;

    @Column(name = "serial_number")
    private String serialNumber;

}