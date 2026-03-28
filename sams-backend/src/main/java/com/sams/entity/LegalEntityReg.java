package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_legal_entity_reg", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LegalEntityReg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "legal_entity_reg_id")
    private Long legalEntityRegId;

    @Column(name = "registration_name")
    private String registrationName;

    @Column(name = "registration_no")
    private String registrationNo;

    @Column(name = "legal_entity_id")
    private Long legalEntityId;

    @Column(name = "legal_entity_name")
    private String legalEntityName;

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