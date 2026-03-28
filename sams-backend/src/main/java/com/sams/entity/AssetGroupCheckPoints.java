package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_group_check_points", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetGroupCheckPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_group_check_pts_id")
    private Long assetGroupCheckPtsId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "parameter_id")
    private Long parameterId;

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