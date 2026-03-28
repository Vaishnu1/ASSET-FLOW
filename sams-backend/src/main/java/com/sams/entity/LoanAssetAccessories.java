package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_asset_accessories", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanAssetAccessories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_asset_accessories_id")
    private Long loanAssetAccessoriesId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "loan_id")
    private Long loanId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "model_item_id")
    private Long modelItemId;

    @Column(name = "accessories_issued")
    private Boolean accessoriesIssued;

    @Column(name = "accessories_returned")
    private Boolean accessoriesReturned;

    @Column(name = "accessories_written_of")
    private Boolean accessoriesWrittenOf;

    @Column(name = "accessories_written_of_remarks")
    private String accessoriesWrittenOfRemarks;

    @Column(name = "remarks")
    private String remarks;

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

}