package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_code_change_req", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCodeChangeReq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_code_change_req_id")
    private Long assetCodeChangeReqId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "new_asset_code")
    private String newAssetCode;

    @Column(name = "reason")
    private String reason;

    @Column(name = "new_ceid_status")
    private String newCeidStatus;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "request_raised_by")
    private String requestRaisedBy;

    @Column(name = "request_raised_dt")
    private LocalDateTime requestRaisedDt;

    @Column(name = "approved_or_rejected_by")
    private String approvedOrRejectedBy;

    @Column(name = "approved_or_rejected_dt")
    private LocalDateTime approvedOrRejectedDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}