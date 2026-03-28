package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_physical_audit_hdr", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetPhysicalAuditHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_physical_audit_hdr_id")
    private Long assetPhysicalAuditHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "physical_audit_name")
    private String physicalAuditName;

    @Column(name = "physical_audit_date")
    private LocalDateTime physicalAuditDate;

    @Column(name = "asset_audit_status_id")
    private Long assetAuditStatusId;

    @Column(name = "active")
    private Boolean active;

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

    @Column(name = "audit_type")
    private String auditType;

}