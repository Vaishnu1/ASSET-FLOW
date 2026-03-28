package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_stock_transfer_hdr", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTransferHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_transfer_hdr_id")
    private Long stockTransferHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "stock_transfer_no")
    private String stockTransferNo;

    @Column(name = "from_store_id")
    private Long fromStoreId;

    @Column(name = "to_store_id")
    private Long toStoreId;

    @Column(name = "from_asset_id")
    private Long fromAssetId;

    @Column(name = "to_asset_id")
    private Long toAssetId;

    @Column(name = "stock_transfer_type")
    private String stockTransferType;

    @Column(name = "stock_transfer_status")
    private String stockTransferStatus;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "source_screen")
    private String sourceScreen;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}