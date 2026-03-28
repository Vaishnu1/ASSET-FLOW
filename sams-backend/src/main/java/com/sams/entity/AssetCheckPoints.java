package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_check_points", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCheckPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_check_pts_id")
    private Long assetCheckPtsId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "parameter_type_id")
    private Long parameterTypeId;

    @Column(name = "parameter_type")
    private String parameterType;

    @Column(name = "parameter_id")
    private Long parameterId;

    @Column(name = "parameter_name")
    private String parameterName;

    @Column(name = "parameter_group_id")
    private Long parameterGroupId;

    @Column(name = "parameter_group_name")
    private String parameterGroupName;

    @Column(name = "used_for")
    private String usedFor;

    @Column(name = "start_value")
    private String startValue;

    @Column(name = "end_value")
    private String endValue;

    @Column(name = "uom")
    private String uom;

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