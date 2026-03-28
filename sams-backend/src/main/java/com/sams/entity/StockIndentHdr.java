package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_indent_hdr", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockIndentHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "indent_hdr_id")
    private Long indentHdrId;

    @Column(name = "indent_no")
    private String indentNo;

    @Column(name = "indent_dt")
    private LocalDateTime indentDt;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "requested_by_id")
    private Long requestedById;

    @Column(name = "processed_flg")
    private String processedFlg;

    @Column(name = "requested_by")
    private String requestedBy;

    @Column(name = "requested_dt")
    private LocalDateTime requestedDt;

    @Column(name = "indent_status")
    private String indentStatus;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_activity_id")
    private Long srActivityId;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "error_flg")
    private String errorFlg;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}