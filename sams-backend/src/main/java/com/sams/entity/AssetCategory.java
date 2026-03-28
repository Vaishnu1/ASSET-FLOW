package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_category", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "business_type")
    private String businessType;

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

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "direction")
    private String direction;

    @Column(name = "maintenance_incharge_required")
    private Boolean maintenanceInchargeRequired;

    @Column(name = "specification")
    private Boolean specification;

    @Column(name = "depreciation")
    private Boolean depreciation;

    @Column(name = "model_items")
    private Boolean modelItems;

    @Column(name = "document")
    private Boolean document;

    @Column(name = "self_analysis")
    private Boolean selfAnalysis;

    @Column(name = "additional_info")
    private Boolean additionalInfo;

    @Column(name = "check_list")
    private Boolean checkList;

    @Column(name = "solution_bank")
    private Boolean solutionBank;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "technical_specelist")
    private Boolean technicalSpecelist;

    @Column(name = "inventory_module")
    private String inventoryModule;

    @Column(name = "maintenance_schedule")
    private Boolean maintenanceSchedule;

    @Column(name = "child_model")
    private Boolean childModel;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}