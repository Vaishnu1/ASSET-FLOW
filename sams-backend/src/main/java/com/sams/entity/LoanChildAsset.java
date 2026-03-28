package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_child_asset", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanChildAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_child_asset_id")
    private Long loanChildAssetId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "loan_id")
    private Long loanId;

    @Column(name = "child_asset_id")
    private Long childAssetId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "child_asset_issued")
    private Boolean childAssetIssued;

    @Column(name = "child_asset_return")
    private Boolean childAssetReturn;

    @Column(name = "child_asset_written_of")
    private Boolean childAssetWrittenOf;

    @Column(name = "child_asset_written_of_remarks")
    private String childAssetWrittenOfRemarks;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}