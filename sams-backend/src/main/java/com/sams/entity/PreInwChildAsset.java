package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pre_inw_child_asset", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreInwChildAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pre_inw_child_asset_id")
    private Long preInwChildAssetId;

    @Column(name = "inward_inventory_dtl_id")
    private Long inwardInventoryDtlId;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_name")
    private String businessPartnerName;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}