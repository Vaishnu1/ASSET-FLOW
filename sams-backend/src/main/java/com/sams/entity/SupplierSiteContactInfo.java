package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier_site_contact_info", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierSiteContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_site_contact_id")
    private Long supplierSiteContactId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "contact_person_name")
    private String contactPersonName;

    @Column(name = "contact_person_phone_no")
    private String contactPersonPhoneNo;

    @Column(name = "contact_person_email_id")
    private String contactPersonEmailId;

    @Column(name = "contact_person_designation")
    private String contactPersonDesignation;

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