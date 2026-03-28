package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_transaction", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_transaction_id")
    private Long assetTransactionId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_transaction_source")
    private String assetTransactionSource;

    @Column(name = "asset_transaction_source_desc")
    private String assetTransactionSourceDesc;

    @Column(name = "asset_transaction_source_id")
    private Long assetTransactionSourceId;

    @Column(name = "asset_transaction_source_no")
    private String assetTransactionSourceNo;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "asset_transaction_name")
    private String assetTransactionName;

}