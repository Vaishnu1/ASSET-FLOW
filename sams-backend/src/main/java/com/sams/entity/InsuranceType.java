package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "insurance_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "insurance_type_id")
    private Long insuranceTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "insurance_type_name")
    private String insuranceTypeName;

    @Column(name = "insurance_type_desc")
    private String insuranceTypeDesc;

    @Column(name = "insurance_type_for")
    private String insuranceTypeFor;

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