package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_training", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrTraining {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_training_id")
    private Long srTrainingId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "training_type_id")
    private Long trainingTypeId;

    @Column(name = "training_type_name")
    private String trainingTypeName;

    @Column(name = "training_dt")
    private LocalDateTime trainingDt;

    @Column(name = "traineer_desc")
    private String traineerDesc;

    @Column(name = "traineer_name")
    private String traineerName;

    @Column(name = "traineer_contact_no")
    private String traineerContactNo;

    @Column(name = "traineer_email_id")
    private String traineerEmailId;

    @Column(name = "training_company")
    private String trainingCompany;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}