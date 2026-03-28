package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "check_point_test_equipment", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckPointTestEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_eqpt_id")
    private Long testEqptId;

    @Column(name = "check_points_id")
    private Long checkPointsId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "last_pa_done_date")
    private LocalDateTime lastPaDoneDate;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}