package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "child_asset", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "child_asset_id")
    private Long childAssetId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "child_asset_hdr_id")
    private Long childAssetHdrId;

    @Column(name = "child_asset_no")
    private String childAssetNo;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "deleted_dt")
    private LocalDateTime deletedDt;

    @Column(name = "deleted_by")
    private String deletedBy;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}