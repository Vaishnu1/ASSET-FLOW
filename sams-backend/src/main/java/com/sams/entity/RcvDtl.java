package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rcv_dtl", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RcvDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rcv_dtl_id")
    private Long rcvDtlId;

    @Column(name = "rcv_hdr_id")
    private Long rcvHdrId;

    @Column(name = "rcv_line_no")
    private Long rcvLineNo;

    @Column(name = "supp_cd")
    private String suppCd;

    @Column(name = "po_id")
    private Long poId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_line_id")
    private Long poLineId;

    @Column(name = "po_line_no")
    private Long poLineNo;

    @Column(name = "requisition_id")
    private Long requisitionId;

    @Column(name = "requisition_no")
    private String requisitionNo;

    @Column(name = "requisition_line_id")
    private Long requisitionLineId;

    @Column(name = "requisition_line_no")
    private Long requisitionLineNo;

    @Column(name = "ref_no")
    private String refNo;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "lot_control_flag")
    private String lotControlFlag;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "transfer_cost")
    private Double transferCost;

    @Column(name = "transportation_cost")
    private Double transportationCost;

    @Column(name = "drop_ship")
    private String dropShip;

    @Column(name = "rcv_qty")
    private Double rcvQty;

    @Column(name = "old_rcv_qty")
    private Double oldRcvQty;

    @Column(name = "accept_qty")
    private Double acceptQty;

    @Column(name = "old_accept_qty")
    private Double oldAcceptQty;

    @Column(name = "reject_qty")
    private Double rejectQty;

    @Column(name = "old_reject_qty")
    private Double oldRejectQty;

    @Column(name = "reject_reason_id")
    private Long rejectReasonId;

    @Column(name = "po_qty")
    private Double poQty;

    @Column(name = "po_bal_qty")
    private Double poBalQty;

    @Column(name = "req_dt")
    private LocalDateTime reqDt;

    @Column(name = "inv_status")
    private String invStatus;

    @Column(name = "wh_id")
    private Long whId;

    @Column(name = "wh_cd")
    private String whCd;

    @Column(name = "supplier_lot_no")
    private String supplierLotNo;

    @Column(name = "locator_id")
    private Long locatorId;

    @Column(name = "locator_cd")
    private String locatorCd;

    @Column(name = "comments")
    private String comments;

    @Column(name = "country_of_origin_cd")
    private String countryOfOriginCd;

    @Column(name = "bar_code_label")
    private String barCodeLabel;

    @Column(name = "project_code")
    private String projectCode;

    @Column(name = "job_order_id")
    private Long jobOrderId;

    @Column(name = "replacement")
    private String replacement;

    @Column(name = "po_dtl_id")
    private Long poDtlId;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "wo_number")
    private String woNumber;

}