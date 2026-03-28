package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_audit_status", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetAuditStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_audit_status_id")
    private Long assetAuditStatusId;

    @Column(name = "display_sequence_order")
    private Long displaySequenceOrder;

    @Column(name = "asset_audit_status_name")
    private String assetAuditStatusName;

    @Column(name = "asset_audit_status_desc")
    private String assetAuditStatusDesc;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}