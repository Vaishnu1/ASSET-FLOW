package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_item_loc", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemLoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_item_loc_id")
    private Long itemLocId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "m_item_id")
    private Long itemId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "item_status")
    private String itemStatus;

    @Column(name = "invoiceable")
    private Boolean invoiceable;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "max_stock_qty")
    private Double maxStockQty;

    @Column(name = "min_stock_qty")
    private Double minStockQty;

    @Column(name = "costing_type")
    private String costingType;

    @Column(name = "serial_controlled")
    private Boolean serialControlled;

    @Column(name = "batch_controlled")
    private Boolean batchControlled;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}