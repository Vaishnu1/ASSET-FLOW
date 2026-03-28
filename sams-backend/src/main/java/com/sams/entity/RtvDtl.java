package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rtv_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RtvDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rtv_dtl_id")
    private Long rtvDtlId;

    @Column(name = "rtv_hdr_id")
    private Long rtvHdrId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "grn_dtl_id")
    private Long grnDtlId;

    @Column(name = "po_line_id")
    private Long poLineId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "po_qty")
    private Double poQty;

    @Column(name = "grn_qty")
    private Double grnQty;

    @Column(name = "rtv_qty")
    private Double rtvQty;

    @Column(name = "stock_qty")
    private Double stockQty;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "manufacturer_part_no")
    private String manufacturerPartNo;

    @Column(name = "rtv_reason")
    private String rtvReason;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

}