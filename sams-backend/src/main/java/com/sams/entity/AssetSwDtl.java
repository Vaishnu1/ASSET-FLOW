package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_sw_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetSwDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_sw_dtl_id")
    private Long assetSwDtlId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "software_name")
    private String softwareName;

    @Column(name = "version")
    private String version;

    @Column(name = "licence_key")
    private String licenceKey;

    @Column(name = "no_of_licence")
    private Long noOfLicence;

    @Column(name = "activation_dt")
    private LocalDateTime activationDt;

    @Column(name = "expiry_dt")
    private LocalDateTime expiryDt;

    @Column(name = "active")
    private Boolean active;

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

}