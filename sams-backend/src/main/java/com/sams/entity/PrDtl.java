package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pr_dtl", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_dtl_id")
    private Long prDtlId;

    @Column(name = "pr_id")
    private Long prId;

    @Column(name = "pr_no")
    private String prNo;

    @Column(name = "pr_line_no")
    private Long prLineNo;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "supplier_site_name")
    private String supplierSiteName;

    @Column(name = "supplier_item_cd")
    private String supplierItemCd;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "new_item_flag")
    private Boolean newItemFlag;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "manufacturer_part_no")
    private String manufacturerPartNo;

    @Column(name = "uom_code")
    private String uomCode;

    @Column(name = "item_category_id")
    private Long itemCategoryId;

    @Column(name = "item_category_name")
    private String itemCategoryName;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

    @Column(name = "pr_required_qty")
    private Long prRequiredQty;

    @Column(name = "pr_cancel_qty")
    private Long prCancelQty;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "need_by_dt")
    private LocalDateTime needByDt;

    @Column(name = "basic_amt")
    private Double basicAmt;

    @Column(name = "tax_cd1")
    private String taxCd1;

    @Column(name = "tax_rate1")
    private Double taxRate1;

    @Column(name = "tax_amt1")
    private Double taxAmt1;

    @Column(name = "tax_cd2")
    private String taxCd2;

    @Column(name = "tax_rate2")
    private Double taxRate2;

    @Column(name = "tax_amt2")
    private Double taxAmt2;

    @Column(name = "tax_cd3")
    private String taxCd3;

    @Column(name = "tax_rate3")
    private Double taxRate3;

    @Column(name = "tax_amt3")
    private Double taxAmt3;

    @Column(name = "item_total_tax_amt")
    private Double itemTotalTaxAmt;

    @Column(name = "total_amt")
    private Double totalAmt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "po_hdr_id")
    private Long poHdrId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "exch_rate")
    private Double exchRate;

    @Column(name = "local_total_amt")
    private Double localTotalAmt;

}