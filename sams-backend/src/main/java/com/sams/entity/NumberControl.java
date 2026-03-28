package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_number_control", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NumberControl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number_control_id")
    private Long numberControlId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "number_control_name")
    private String numberControlName;

    @Column(name = "number_control_desc")
    private String numberControlDesc;

    @Column(name = "number_control_module")
    private String numberControlModule;

    @Column(name = "prefix_cd")
    private String prefixCd;

    @Column(name = "suffix_cd")
    private String suffixCd;

    @Column(name = "last_number")
    private Long lastNumber;

    @Column(name = "max_number")
    private Long maxNumber;

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