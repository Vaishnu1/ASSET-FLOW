package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "model_other_info", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelOtherInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_other_info_id")
    private Long modelOtherInfoId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "info_name")
    private String infoName;

    @Column(name = "info_label")
    private String infoLabel;

    @Column(name = "info_title")
    private String infoTitle;

    @Column(name = "info_type")
    private String infoType;

    @Column(name = "info_details")
    private String infoDetails;

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