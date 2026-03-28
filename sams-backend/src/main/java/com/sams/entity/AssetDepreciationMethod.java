package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_depreciation_method", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetDepreciationMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_depreciation_method_id")
    private Long assetDepreciationMethodId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_depreciation_method_name")
    private String assetDepreciationMethodName;

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