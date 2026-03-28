package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_loc_asset_code_generation", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocAssetCodeGeneration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_asset_code_generation_id")
    private Long locAssetCodeGenerationId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "sub_category_id")
    private Long subCategoryId;

    @Column(name = "sub_category_name")
    private String subCategoryName;

    @Column(name = "prefix")
    private String prefix;

    @Column(name = "variable_1")
    private String variable1;

    @Column(name = "variable_2")
    private String variable2;

    @Column(name = "variable_3")
    private String variable3;

    @Column(name = "separator")
    private String separator;

    @Column(name = "auto_generate")
    private Boolean autoGenerate;

    @Column(name = "sequence_name")
    private String sequenceName;

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