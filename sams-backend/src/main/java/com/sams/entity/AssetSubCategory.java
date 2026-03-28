package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_sub_category", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetSubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sub_category_id")
    private Long subCategoryId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sub_category_name")
    private String subCategoryName;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name")
    private String categoryName;

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

    @Column(name = "expected_life_in_years")
    private Integer expectedLifeInYears;

    @Column(name = "maintainance_threshold_per")
    private Integer maintainanceThresholdPer;

    @Column(name = "_depreciation_method_id")
    private Long DepreciationMethodId;

    @Column(name = "_depreciation_method_name")
    private String DepreciationMethodName;

    @Column(name = "rate_of_depreciation")
    private Integer rateOfDepreciation;

    @Column(name = "scrap_value_per")
    private Integer scrapValuePer;

    @Column(name = "asset_sub_category_code")
    private String assetSubCategoryCode;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}