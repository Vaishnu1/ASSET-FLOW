package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_cust_field_value", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCustFieldValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "custom_field_val_id")
    private Long customFieldValId;

    @Column(name = "custom_hdr_id")
    private Long customHdrId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_source")
    private String transactionSource;

    @Column(name = "value")
    private String value;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}