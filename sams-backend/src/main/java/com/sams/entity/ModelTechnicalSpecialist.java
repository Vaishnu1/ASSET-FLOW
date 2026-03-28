package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "model_technical_specialist", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelTechnicalSpecialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_specialist_id")
    private Long modelSpecialistId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "specialist_org_type")
    private String specialistOrgType;

    @Column(name = "specialist_id")
    private Long specialistId;

    @Column(name = "specialist_name")
    private String specialistName;

    @Column(name = "ext_engineer_org_name")
    private String extEngineerOrgName;

    @Column(name = "ext_engineer_contact_no")
    private String extEngineerContactNo;

    @Column(name = "ext_engineer_email_id")
    private String extEngineerEmailId;

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