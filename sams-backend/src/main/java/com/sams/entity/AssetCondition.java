package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_condition", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "asset_condition_name")
    private String assetConditionName;

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

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "asset_condition_desc")
    private String assetConditionDesc;

}