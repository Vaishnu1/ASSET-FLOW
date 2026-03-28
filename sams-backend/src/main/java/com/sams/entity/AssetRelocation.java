package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_relocation", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetRelocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "asset_relocate_id")
    private Long assetRelocateId;

    @Column(name = "relocate_batch_no")
    private Integer relocateBatchNo;

    @Column(name = "source_loc_id")
    private Long sourceLocId;

    @Column(name = "source_loc_name")
    private String sourceLocName;

    @Column(name = "source_dep_id")
    private Long sourceDepId;

    @Column(name = "source_dep_name")
    private String sourceDepName;

    @Column(name = "source_sub_dep_id")
    private Long sourceSubDepId;

    @Column(name = "source_sub_dep_name")
    private String sourceSubDepName;

    @Column(name = "relocate_loc_id")
    private Long relocateLocId;

    @Column(name = "relocate_loc_name")
    private String relocateLocName;

    @Column(name = "relocate_dep_id")
    private Long relocateDepId;

    @Column(name = "relocate_dep_name")
    private String relocateDepName;

    @Column(name = "relocate_sub_dep_id")
    private Long relocateSubDepId;

    @Column(name = "relocate_sub_dep_name")
    private String relocateSubDepName;

    @Column(name = "requested_by")
    private String requestedBy;

    @Column(name = "requested_dt")
    private LocalDateTime requestedDt;

    @Column(name = "requested_dt_disp")
    private String requestedDtDisp;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "approved_dt_disp")
    private String approvedDtDisp;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "relocate_status")
    private Integer relocateStatus;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "relocate_asset_code")
    private Integer relocateAssetCode;

    @Column(name = "volume_license_present")
    private Boolean volumeLicensePresent;

    @Column(name = "previous_status_id")
    private Long previousStatusId;

    @Column(name = "relocate_status_name")
    private String relocateStatusName;

    @Column(name = "primary_engg_name")
    private String primaryEnggName;

    @Column(name = "primary_engg_name_id")
    private Long primaryEnggNameId;

    @Column(name = "secondary_engg_name")
    private String secondaryEnggName;

    @Column(name = "secondary_engg_name_id")
    private Long secondaryEnggNameId;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}