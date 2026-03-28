package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_po_price_dtl", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoPriceDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_price_dtl_id")
    private Long poPriceDtlId;

    @Column(name = "po_price_hdr_id")
    private Long poPriceHdrId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "uom_code")
    private String uomCode;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "currency")
    private Double currency;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}