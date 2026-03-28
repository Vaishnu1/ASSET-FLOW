package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_business_partner_site", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessPartnerSite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "partner_site_name")
    private String partnerSiteName;

    @Column(name = "contact_person_name")
    private String contactPersonName;

    @Column(name = "contact_person_phone_no")
    private String contactPersonPhoneNo;

    @Column(name = "contact_person_email_id")
    private String contactPersonEmailId;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "area")
    private String area;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "pin_code")
    private String pinCode;

    @Column(name = "company_mobile_number")
    private String companyMobileNumber;

    @Column(name = "company_land_line_number")
    private String companyLandLineNumber;

    @Column(name = "company_email_id")
    private String companyEmailId;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "website")
    private String website;

    @Column(name = "service_center_site")
    private Boolean serviceCenterSite;

    @Column(name = "supplier_site")
    private Boolean supplierSite;

    @Column(name = "manufacturer_site")
    private Boolean manufacturerSite;

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