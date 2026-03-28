package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rcv_dtl_lines", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RcvDtlLines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rcv_dtl_line_id")
    private Long rcvDtlLineId;

    @Column(name = "rcv_hdr_id")
    private Long rcvHdrId;

    @Column(name = "rcv_dtl_id")
    private Long rcvDtlId;

    @Column(name = "wh_id")
    private Long whId;

    @Column(name = "wh_cd")
    private String whCd;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "lot_no")
    private String lotNo;

    @Column(name = "serial_no")
    private String serialNo;

    @Column(name = "qty")
    private Double qty;

    @Column(name = "old_qty")
    private Double oldQty;

    @Column(name = "lot_expiry_dt")
    private LocalDateTime lotExpiryDt;

    @Column(name = "locator_id")
    private Long locatorId;

    @Column(name = "locator_cd")
    private String locatorCd;

    @Column(name = "stock_status")
    private String stockStatus;

    @Column(name = "inv_status")
    private String invStatus;

    @Column(name = "reject_reason_id")
    private Long rejectReasonId;

    @Column(name = "comments")
    private String comments;

    @Column(name = "supplier_lot_no")
    private String supplierLotNo;

    @Column(name = "spec1")
    private String spec1;

    @Column(name = "spec2")
    private String spec2;

    @Column(name = "spec3")
    private String spec3;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}