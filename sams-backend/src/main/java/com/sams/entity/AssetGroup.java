package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_group", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "asset_group_desc")
    private String assetGroupDesc;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_type_name")
    private String assetTypeName;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "sub_category_id")
    private Long subCategoryId;

    @Column(name = "sub_category_name")
    private String subCategoryName;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "frequency1")
    private String frequency1;

    @Column(name = "frequency2")
    private String frequency2;

    @Column(name = "frequency3")
    private String frequency3;

    @Column(name = "maintenance_strategy")
    private String maintenanceStrategy;

    @Column(name = "critical_nature")
    private String criticalNature;

    @Column(name = "em_score")
    private String emScore;

    @Column(name = "child_asset")
    private Boolean childAsset;

    @Column(name = "asset_custom_field_value")
    private String assetCustomFieldValue;

    @Column(name = "asset_group_attribute1")
    private String assetGroupAttribute1;

    @Column(name = "asset_group_attribute2")
    private String assetGroupAttribute2;

    @Column(name = "asset_group_attribute3")
    private String assetGroupAttribute3;

    @Column(name = "asset_group_attribute4")
    private String assetGroupAttribute4;

    @Column(name = "asset_group_attribute5")
    private String assetGroupAttribute5;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "direction")
    private String direction;

    @Column(name = "specification")
    private Boolean specification;

    @Column(name = "device_code")
    private String deviceCode;

    @Column(name = "device_concept")
    private String deviceConcept;

    @Column(name = "asset_group_code")
    private String assetGroupCode;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}