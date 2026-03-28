package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_stock_transfer_dtl", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTransferDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_transfer_dtl_id")
    private Long stockTransferDtlId;

    @Column(name = "stock_transfer_hdr_id")
    private Long stockTransferHdrId;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "available_qty")
    private Double availableQty;

    @Column(name = "transfer_qty")
    private Double transferQty;

    @Column(name = "issue_qty")
    private Double issueQty;

    @Column(name = "consumed_qty")
    private Double consumedQty;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}