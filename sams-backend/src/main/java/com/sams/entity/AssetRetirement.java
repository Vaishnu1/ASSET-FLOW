package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_retirement", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetRetirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_retire_id")
    private Long assetRetireId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "asset_retirement_status_id")
    private Long assetRetirementStatusId;

    @Column(name = "retirement_no")
    private String retirementNo;

    @Column(name = "retirement_dt")
    private LocalDateTime retirementDt;

    @Column(name = "retirement_status")
    private String retirementStatus;

    @Column(name = "requested_by")
    private String requestedBy;

    @Column(name = "request_reason")
    private String requestReason;

    @Column(name = "retirement_remarks")
    private String retirementRemarks;

    @Column(name = "salvageable")
    private Boolean salvageable;

    @Column(name = "buy_back")
    private Boolean buyBack;

    @Column(name = "buy_back_supplier_id")
    private Long buyBackSupplierId;

    @Column(name = "buy_back_supplier_site_id")
    private Long buyBackSupplierSiteId;

    @Column(name = "retire_value_for_buy_back")
    private Double retireValueForBuyBack;

    @Column(name = "retire_remark_for_buy_back")
    private String retireRemarkForBuyBack;

    @Column(name = "dispose")
    private Boolean dispose;

    @Column(name = "dispose_supplier_id")
    private Long disposeSupplierId;

    @Column(name = "dispose_value")
    private Double disposeValue;

    @Column(name = "dispose_remarks")
    private String disposeRemarks;

    @Column(name = "disposal_dt")
    private LocalDateTime disposalDt;

    @Column(name = "issue_gate_pass")
    private Boolean issueGatePass;

    @Column(name = "asset_previous_status_id")
    private Long assetPreviousStatusId;

    @Column(name = "retirement_store_id")
    private Long retirementStoreId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "retirement_mode_id")
    private Long retirementModeId;

    @Column(name = "retirement_mode")
    private String retirementMode;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "regulatory_compliance")
    private Boolean regulatoryCompliance;

}