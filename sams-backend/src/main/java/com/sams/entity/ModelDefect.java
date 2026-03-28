package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "model_defect", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelDefect {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_defect_id")
    private Long modelDefectId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "defect_name")
    private String defectName;

    @Column(name = "defect_tag")
    private String defectTag;

    @Column(name = "defect_cause")
    private String defectCause;

    @Column(name = "defect_solution")
    private String defectSolution;

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