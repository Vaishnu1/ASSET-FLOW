package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_register", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_register_id")
    private Long itemRegisterId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "inv_dtl_id")
    private Long invDtlId;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "transaction_dt")
    private LocalDateTime transactionDt;

    @Column(name = "transaction_desc")
    private String transactionDesc;

    @Column(name = "in_qty")
    private Double inQty;

    @Column(name = "out_qty")
    private Double outQty;

    @Column(name = "balance_qty")
    private Double balanceQty;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}