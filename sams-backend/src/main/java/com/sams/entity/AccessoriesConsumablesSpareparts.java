package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "accessories_consumables_spareparts", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessoriesConsumablesSpareparts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accessories_consumables_spareparts_id")
    private Long accessoriesConsumablesSparepartsId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "stock_transfer_dtl_id")
    private Long stockTransferDtlId;

    @Column(name = "stock_transfer_hdr_id")
    private Long stockTransferHdrId;

    @Column(name = "consumed_qty")
    private Double consumedQty;

    @Column(name = "remaining_qty")
    private Double remainingQty;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}