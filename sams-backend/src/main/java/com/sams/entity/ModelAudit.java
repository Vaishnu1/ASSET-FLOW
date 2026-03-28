package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_model_audit", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "mode")
    private String mode;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_no")
    private String modelNo;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

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