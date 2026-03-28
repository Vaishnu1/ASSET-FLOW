package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_group_stat_certificate", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetGroupStatCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_group_stat_id")
    private Long assetGroupStatId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "certificate_id")
    private Long certificateId;

    @Column(name = "certificate_name")
    private String certificateName;

    @Column(name = "mandatory_required_stage")
    private String mandatoryRequiredStage;

    @Column(name = "required")
    private Boolean required;

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