package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_group_check_list", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetGroupCheckList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "check_list_id")
    private Long checkListId;

    @Column(name = "parameter_name")
    private String parameterName;

    @Column(name = "parameter_type")
    private String parameterType;

    @Column(name = "input_type")
    private String inputType;

    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "option3")
    private String option3;

    @Column(name = "no_of_options")
    private Integer noOfOptions;

    @Column(name = "combo_values")
    private String comboValues;

    @Column(name = "min_value")
    private Integer minValue;

    @Column(name = "max_value")
    private Integer maxValue;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "direction")
    private String direction;

    @Column(name = "column_name")
    private String columnName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}