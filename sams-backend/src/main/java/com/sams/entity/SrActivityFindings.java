package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_activity_findings", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrActivityFindings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_activity_findings_id")
    private Long srActivityFindingsId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_activity_findings_name")
    private String srActivityFindingsName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}