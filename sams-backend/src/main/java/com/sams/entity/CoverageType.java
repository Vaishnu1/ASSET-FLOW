package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "coverage_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoverageType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coverage_type_id")
    private Long coverageTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "coverage_type_name")
    private String coverageTypeName;

    @Column(name = "coverage_type_desc")
    private String coverageTypeDesc;

    @Column(name = "coverage_for")
    private String coverageFor;

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