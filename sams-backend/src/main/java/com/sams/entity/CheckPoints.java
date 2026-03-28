package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_check_points", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "check_points_id")
    private Long checkPointsId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_check_points_id")
    private Long modelCheckPointsId;

    @Column(name = "check_point_name")
    private String checkPointName;

    @Column(name = "uom")
    private String uom;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "duration")
    private String duration;

    @Column(name = "result")
    private String result;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}