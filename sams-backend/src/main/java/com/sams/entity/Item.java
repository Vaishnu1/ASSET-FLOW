package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_item", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "item_loc_id")
    private Long itemLocId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "invoiceable")
    private Boolean invoiceable;

    @Column(name = "item_status")
    private String itemStatus;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "max_stock_qty")
    private Integer maxStockQty;

    @Column(name = "min_stock_qty")
    private Integer minStockQty;

    @Column(name = "costing_type")
    private String costingType;

    @Column(name = "serial_controlled")
    private Boolean serialControlled;

    @Column(name = "batch_controlled")
    private Boolean batchControlled;

    @Column(name = "item_master_id")
    private Long itemMasterId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "item_name_concat")
    private String itemNameConcat;

    @Column(name = "item_supplier_list")
    private String itemSupplierList;

    @Column(name = "item_loc_access_list")
    private String itemLocAccessList;

    @Column(name = "total_cost")
    private Double totalCost;

    @Column(name = "item_approval_status")
    private String itemApprovalStatus;

    @Column(name = "item_master_t_o")
    private String itemMasterTO;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "active_display")
    private String activeDisplay;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "store_name")
    private String storeName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}