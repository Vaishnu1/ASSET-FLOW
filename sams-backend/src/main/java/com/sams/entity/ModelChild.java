package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_model_child", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelChild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_child_id")
    private Long modelChildId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "parent_model_id")
    private Long parentModelId;

    @Column(name = "child_model_id")
    private Long childModelId;

    @Column(name = "child_asset_group_id")
    private Long childAssetGroupId;

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