package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_purchase_price", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPurchasePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_purchase_price_id")
    private Long itemPurchasePriceId;

    @Column(name = "m_item_loc_id")
    private Long itemLocId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "price_eff_from_dt")
    private LocalDateTime priceEffFromDt;

    @Column(name = "price_eff_to_dt")
    private LocalDateTime priceEffToDt;

    @Column(name = "unit_purchase_price")
    private Double unitPurchasePrice;

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