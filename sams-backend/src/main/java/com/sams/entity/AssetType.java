package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_type_name")
    private String assetTypeName;

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

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "sub_category_name")
    private String subCategoryName;

    @Column(name = "sub_category_id")
    private Long subCategoryId;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}