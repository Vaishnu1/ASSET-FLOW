package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inv_dtl_id")
    private Long invDtlId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "manufacturer_part_no")
    private String manufacturerPartNo;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "on_hand_qty")
    private Double onHandQty;

    @Column(name = "create_transaction_id")
    private Long createTransactionId;

    @Column(name = "update_transaction_id")
    private Long updateTransactionId;

    @Column(name = "bin_id")
    private Long binId;

    @Column(name = "lot_number")
    private String lotNumber;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "original_received_date")
    private LocalDateTime originalReceivedDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}