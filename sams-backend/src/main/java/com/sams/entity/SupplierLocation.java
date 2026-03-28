package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier_location", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "supplier_location_id")
    private Long supplierLocationId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_site_name")
    private String supplierSiteName;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "supp_loc_address1")
    private String suppLocAddress1;

    @Column(name = "supp_loc_address2")
    private String suppLocAddress2;

    @Column(name = "supp_loc_area")
    private String suppLocArea;

    @Column(name = "supp_loc_city")
    private String suppLocCity;

    @Column(name = "supp_loc_state")
    private String suppLocState;

    @Column(name = "supp_loc_country")
    private String suppLocCountry;

    @Column(name = "supp_loc_pin_code")
    private String suppLocPinCode;

    @Column(name = "company_registration_number")
    private String companyRegistrationNumber;

    @Column(name = "tax_registration_name1")
    private String taxRegistrationName1;

    @Column(name = "tax_registration_name2")
    private String taxRegistrationName2;

    @Column(name = "tax_registration_name3")
    private String taxRegistrationName3;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "land_line_number")
    private String landLineNumber;

    @Column(name = "supp_loc_email")
    private String suppLocEmail;

    @Column(name = "supp_loc_cur_cd")
    private String suppLocCurCd;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "supp_loc_attribute1")
    private String suppLocAttribute1;

    @Column(name = "supp_loc_attribute2")
    private String suppLocAttribute2;

    @Column(name = "supp_loc_attribute3")
    private String suppLocAttribute3;

    @Column(name = "supp_loc_attribute4")
    private String suppLocAttribute4;

    @Column(name = "supp_loc_attribute5")
    private String suppLocAttribute5;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "supplier_reg_list")
    private String supplierRegList;

    @Column(name = "supplier_type")
    private String supplierType;

    @Column(name = "supplier_name")
    private String supplierName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}