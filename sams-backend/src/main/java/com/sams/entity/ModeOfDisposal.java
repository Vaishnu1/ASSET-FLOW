package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "mode_of_disposal", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeOfDisposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mode_of_disposal_id")
    private Long modeOfDisposalId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "mode_of_disposal_name")
    private String modeOfDisposalName;

    @Column(name = "is_gatepass_needed")
    private Boolean isGatepassNeeded;

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