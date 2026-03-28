package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_custom_fields_value", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCustomFieldsValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "custom_fields_value_id")
    private Long customFieldsValueId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "custom_fields_hdr_id")
    private Long customFieldsHdrId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "field_value")
    private String fieldValue;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_source")
    private String transactionSource;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}