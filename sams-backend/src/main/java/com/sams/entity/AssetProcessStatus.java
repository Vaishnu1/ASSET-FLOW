package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_process_status", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetProcessStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_process_status_id")
    private Long assetProcessStatusId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "process_status_id")
    private Long processStatusId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}