package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_volume_license", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolumeLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "volume_license_id")
    private Long volumeLicenseId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "product_key")
    private String productKey;

    @Column(name = "status")
    private String status;

    @Column(name = "assigned_asset_id")
    private Long assignedAssetId;

    @Column(name = "child_asset_id")
    private Long childAssetId;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "assigned_employee_id")
    private Long assignedEmployeeId;

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