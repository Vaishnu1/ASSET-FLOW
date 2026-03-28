package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_group_maintenance_schedule", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetGroupMaintenanceSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_group_maintenance_schedule_id")
    private Long assetGroupMaintenanceScheduleId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "maint_schedule_type_id")
    private Long maintScheduleTypeId;

    @Column(name = "maint_schedule_frequncy_id")
    private Long maintScheduleFrequncyId;

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