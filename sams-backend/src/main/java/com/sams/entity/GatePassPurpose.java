package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "gate_pass_purpose", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GatePassPurpose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gate_pass_purpose_id")
    private Long gatePassPurposeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "purpose_name")
    private String purposeName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}