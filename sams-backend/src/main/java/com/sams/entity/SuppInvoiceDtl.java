package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supp_invoice_dtl", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuppInvoiceDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supp_invoice_dtl_id")
    private Long suppInvoiceDtlId;

    @Column(name = "supp_invoice_id")
    private Long suppInvoiceId;

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

    @Column(name = "supp_item_cd")
    private String suppItemCd;

    @Column(name = "uom_cd")
    private String uomCd;

    @Column(name = "inv_qty")
    private Double invQty;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "loc_unit_price")
    private Double locUnitPrice;

    @Column(name = "inv_amt")
    private Double invAmt;

    @Column(name = "local_inv_amt")
    private Double localInvAmt;

    @Column(name = "ship_req_dt")
    private LocalDateTime shipReqDt;

    @Column(name = "ship_schedule_dt")
    private LocalDateTime shipScheduleDt;

    @Column(name = "last_ship_dt")
    private LocalDateTime lastShipDt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "serial_no")
    private String serialNo;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}