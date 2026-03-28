package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_model", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "model_no")
    private String modelNo;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "volume_license_present")
    private Boolean volumeLicensePresent;

    @Column(name = "installation_type")
    private String installationType;

    @Column(name = "track_individual_licenses")
    private Boolean trackIndividualLicenses;

    @Column(name = "maintenance_threshold_percentage")
    private Double maintenanceThresholdPercentage;

    @Column(name = "expected_life_in_years")
    private Double expectedLifeInYears;

    @Column(name = "depreciation_method_id")
    private Long depreciationMethodId;

    @Column(name = "rate_of_depreciation")
    private Double rateOfDepreciation;

    @Column(name = "scrap_value_percentage")
    private Double scrapValuePercentage;

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