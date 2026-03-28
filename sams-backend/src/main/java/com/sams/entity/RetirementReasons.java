package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_retirement_reasons", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RetirementReasons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "retirement_reasons_id")
    private Long retirementReasonsId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "retirement_reason_name")
    private String retirementReasonName;

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