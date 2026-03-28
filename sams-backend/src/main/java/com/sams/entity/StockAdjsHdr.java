package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_stock_adjs_hdr", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockAdjsHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_adjs_hdr_id")
    private Long stockAdjsHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "loc_id")
    private Long locId;

    @Column(name = "stock_adjs_no")
    private String stockAdjsNo;

    @Column(name = "trans_dt")
    private LocalDateTime transDt;

    @Column(name = "trans_type")
    private String transType;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}