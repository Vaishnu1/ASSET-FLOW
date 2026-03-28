package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_certification_authority", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CertificationAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "certification_authority_id")
    private Long certificationAuthorityId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "certification_authority_name")
    private String certificationAuthorityName;

    @Column(name = "issuing_authority")
    private String issuingAuthority;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "direction")
    private String direction;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}