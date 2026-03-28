package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_business_partner_reg", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessPartnerReg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_partner_reg_id")
    private Long businessPartnerRegId;

    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "registration_name")
    private String registrationName;

    @Column(name = "registration_no")
    private String registrationNo;

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