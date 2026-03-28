package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "grn_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grn_dtl_id")
    private Long grnDtlId;

    @Column(name = "grn_id")
    private Long grnId;

    @Column(name = "grn_no")
    private String grnNo;

    @Column(name = "do_no")
    private String doNo;

    @Column(name = "do_dt")
    private LocalDateTime doDt;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "supplier_site_name")
    private String supplierSiteName;

    @Column(name = "po_id")
    private Long poId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_req_no")
    private String poReqNo;

    @Column(name = "po_line_id")
    private Long poLineId;

    @Column(name = "po_line_no")
    private String poLineNo;

    @Column(name = "po_dt")
    private LocalDateTime poDt;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "maker_part_code")
    private String makerPartCode;

    @Column(name = "manufacturer_part_no")
    private String manufacturerPartNo;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "po_quantity")
    private Long poQuantity;

    @Column(name = "po_bal_qty")
    private Long poBalQty;

    @Column(name = "accept_qty")
    private Long acceptQty;

    @Column(name = "reject_qty")
    private Long rejectQty;

    @Column(name = "rcv_qty")
    private Long rcvQty;

    @Column(name = "tax_amt_1")
    private Double taxAmt1;

    @Column(name = "tax_amt_2")
    private Double taxAmt2;

    @Column(name = "tax_amt_3")
    private Double taxAmt3;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "item_qty_price")
    private Double itemQtyPrice;

    @Column(name = "item_tax")
    private Double itemTax;

    @Column(name = "reject_reason_id")
    private Long rejectReasonId;

    @Column(name = "rtv_flag")
    private Boolean rtvFlag;

    @Column(name = "iqc_completed")
    private String iqcCompleted;

    @Column(name = "iqc_required")
    private String iqcRequired;

    @Column(name = "cancel_flag")
    private String cancelFlag;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "confirm_approval")
    private Boolean confirmApproval;

    @Column(name = "upload_to_inventory")
    private String uploadToInventory;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "rtv_qty")
    private Double rtvQty;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

    @Column(name = "po_type")
    private String poType;

}