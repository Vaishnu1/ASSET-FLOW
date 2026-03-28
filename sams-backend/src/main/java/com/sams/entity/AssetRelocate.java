package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_relocate", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetRelocate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_relocate_id")
    private Long assetRelocateId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "relocate_batch_no")
    private Long relocateBatchNo;

    @Column(name = "source_location_id")
    private Long sourceLocationId;

    @Column(name = "source_location_name")
    private String sourceLocationName;

    @Column(name = "source_dep_id")
    private Long sourceDepId;

    @Column(name = "source_dep_name")
    private String sourceDepName;

    @Column(name = "source_sub_dep_id")
    private Long sourceSubDepId;

    @Column(name = "source_sub_dep_name")
    private String sourceSubDepName;

    @Column(name = "relocate_location_id")
    private Long relocateLocationId;

    @Column(name = "relocate_location_name")
    private String relocateLocationName;

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

    @Column(name = "relocate_status")
    private Long relocateStatus;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "relocate_asset_code")
    private String relocateAssetCode;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "raise_wo")
    private Boolean raiseWo;

    @Column(name = "previous_asset_status_id")
    private Long previousAssetStatusId;

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

    @Column(name = "primary_engg_id")
    private Long primaryEnggId;

    @Column(name = "primary_engg_name")
    private String primaryEnggName;

    @Column(name = "secondary_engg_id")
    private Long secondaryEnggId;

    @Column(name = "secondary_engg_name")
    private String secondaryEnggName;

}