package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "po_d", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoD {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_dtl_id")
    private Long poDtlId;

    @Column(name = "po_id")
    private Long poId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_line_no")
    private Long poLineNo;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "supp_item_cd")
    private String suppItemCd;

    @Column(name = "manufacturer_part_no")
    private String manufacturerPartNo;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "po_qty")
    private Double poQty;

    @Column(name = "po_balance_qty")
    private Long poBalanceQty;

    @Column(name = "cancel_qty")
    private Long cancelQty;

    @Column(name = "cancel_reason_desc")
    private String cancelReasonDesc;

    @Column(name = "received_qty")
    private Long receivedQty;

    @Column(name = "invoiced_qty")
    private Long invoicedQty;

    @Column(name = "master_unit_price")
    private Double masterUnitPrice;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "loc_unit_price")
    private Double locUnitPrice;

    @Column(name = "po_basic_amt")
    private Double poBasicAmt;

    @Column(name = "local_po_basic_amt")
    private Double localPoBasicAmt;

    @Column(name = "inspection_required")
    private String inspectionRequired;

    @Column(name = "po_req_dt")
    private LocalDateTime poReqDt;

    @Column(name = "last_received_dt")
    private LocalDateTime lastReceivedDt;

    @Column(name = "cust_po_no")
    private String custPoNo;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "hold_flg")
    private String holdFlg;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

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

    @Column(name = "net_amt")
    private Double netAmt;

    @Column(name = "ship_type")
    private String shipType;

    @Column(name = "expected_delivery_date")
    private LocalDateTime expectedDeliveryDate;

    @Column(name = "pr_dtl_id")
    private Long prDtlId;

    @Column(name = "pr_cancel")
    private Boolean prCancel;

    @Column(name = "invoice_rcvd_date")
    private LocalDateTime invoiceRcvdDate;

    @Column(name = "invoice_clear")
    private Long invoiceClear;

    @Column(name = "pending_inv_amnt")
    private Double pendingInvAmnt;

    @Column(name = "reject_qty")
    private Long rejectQty;

    @Column(name = "po_req_id")
    private Long poReqId;

    @Column(name = "po_req_no")
    private String poReqNo;

    @Column(name = "del_cfm_dt")
    private LocalDateTime delCfmDt;

    @Column(name = "po_item_cancel")
    private Boolean poItemCancel;

    @Column(name = "rtv_qty")
    private Double rtvQty;

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

    @Column(name = "serial_no")
    private String serialNo;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "po_type")
    private String poType;

}