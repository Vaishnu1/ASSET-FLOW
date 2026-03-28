package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_check_points", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrCheckPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_points_id")
    private Long checkPointsId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_check_pts_id")
    private Long modelCheckPtsId;

    @Column(name = "parameter_name")
    private String parameterName;

    @Column(name = "parameter_type")
    private String parameterType;

    @Column(name = "start_value")
    private String startValue;

    @Column(name = "end_value")
    private String endValue;

    @Column(name = "uom")
    private String uom;

    @Column(name = "actual_value")
    private String actualValue;

    @Column(name = "result")
    private String result;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "parameter_id")
    private Long parameterId;

    @Column(name = "parameter_type_id")
    private Long parameterTypeId;

    @Column(name = "parameter_group_id")
    private Long parameterGroupId;

    @Column(name = "parameter_group_name")
    private String parameterGroupName;

    @Column(name = "default_value")
    private String defaultValue;

    @Column(name = "min_allowed_value")
    private String minAllowedValue;

    @Column(name = "max_allowed_value")
    private String maxAllowedValue;

    @Column(name = "input_type")
    private String inputType;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_check_pts_id")
    private Long assetCheckPtsId;

}