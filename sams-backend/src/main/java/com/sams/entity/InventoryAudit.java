package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_audit", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_audit_id")
    private Long inventoryAuditId;

    @Column(name = "inventory_audit_no")
    private String inventoryAuditNo;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "inventory_id")
    private Long inventoryId;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "old_stk_in_hand")
    private Double oldStkInHand;

    @Column(name = "new_stk_in_hand")
    private Double newStkInHand;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_src")
    private String transactionSrc;

    @Column(name = "transaction_dt")
    private LocalDateTime transactionDt;

    @Column(name = "transaction_no")
    private String transactionNo;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}