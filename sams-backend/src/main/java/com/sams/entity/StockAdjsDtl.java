package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_stock_adjs_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockAdjsDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_adjs_dtl_id")
    private Long stockAdjsDtlId;

    @Column(name = "stock_adjs_hdr_id")
    private Long stockAdjsHdrId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "available_qty")
    private Double availableQty;

    @Column(name = "rcv_qty")
    private Double rcvQty;

    @Column(name = "adj_qty")
    private Double adjQty;

    @Column(name = "wo_no")
    private String woNo;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "whid")
    private Long whid;

    @Column(name = "whcd")
    private String whcd;

}