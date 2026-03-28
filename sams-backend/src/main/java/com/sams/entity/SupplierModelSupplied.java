package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier_model_supplied", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierModelSupplied {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_supplied_id")
    private Long assetSuppliedId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private String createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_dt")
    private String updatedDtDt;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}