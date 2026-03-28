package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_invoice_dtl", schema = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierInvoiceDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_invoice_dtl_id")
    private Long supplierInvoiceDtlId;

    @Column(name = "supplier_invoice_hdr_id")
    private Long supplierInvoiceHdrId;

    @Column(name = "po_dtl_id")
    private Long poDtlId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_line_no")
    private Long poLineNo;

    @Column(name = "receipts_no")
    private String receiptsNo;

    @Column(name = "rcv_dtl_id")
    private Long rcvDtlId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "supplier_item_cd")
    private String supplierItemCd;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "po_qty")
    private Double poQty;

    @Column(name = "grn_qty")
    private Double grnQty;

    @Column(name = "invoice_qty")
    private Double invoiceQty;

    @Column(name = "po_unit_price")
    private Double poUnitPrice;

    @Column(name = "invoice_unit_price")
    private Double invoiceUnitPrice;

    @Column(name = "basic_inv_amt")
    private Double basicInvAmt;

    @Column(name = "tax_cd_1")
    private String taxCd1;

    @Column(name = "tax_rate_1")
    private Double taxRate1;

    @Column(name = "tax_amt_1")
    private Double taxAmt1;

    @Column(name = "tax_cd_2")
    private String taxCd2;

    @Column(name = "tax_rate_2")
    private Double taxRate2;

    @Column(name = "tax_amt_2")
    private Double taxAmt2;

    @Column(name = "total_tax_amt")
    private Double totalTaxAmt;

    @Column(name = "total_inv_amt")
    private Double totalInvAmt;

    @Column(name = "matched_flag")
    private String matchedFlag;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "po_type")
    private String poType;

}