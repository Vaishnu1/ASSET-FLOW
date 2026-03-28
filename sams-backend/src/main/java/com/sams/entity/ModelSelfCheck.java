package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "model_self_check", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelSelfCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_self_check_id")
    private Long modelSelfCheckId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "defect_type")
    private String defectType;

    @Column(name = "defect_tag")
    private String defectTag;

    @Column(name = "defect_question")
    private String defectQuestion;

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