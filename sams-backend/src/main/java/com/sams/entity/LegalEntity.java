package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_legal_entity", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LegalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "legal_entity_id")
    private Long legalEntityId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "legal_entity_name")
    private String legalEntityName;

    @Column(name = "legal_entity_code")
    private String legalEntityCode;

    @Column(name = "legal_entity_desc")
    private String legalEntityDesc;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "postal_cd")
    private String postalCd;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "cur_cd")
    private String curCd;

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