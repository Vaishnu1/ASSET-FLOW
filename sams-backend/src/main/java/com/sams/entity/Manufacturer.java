package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_manufacturer", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Manufacturer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "address")
    private String address;

    @Column(name = "area")
    private String area;

    @Column(name = "loc_country")
    private String locCountry;

    @Column(name = "loc_country_id")
    private Long locCountryId;

    @Column(name = "loc_state_id")
    private Long locStateId;

    @Column(name = "loc_state")
    private String locState;

    @Column(name = "loc_city_id")
    private Long locCityId;

    @Column(name = "loc_city")
    private String locCity;

    @Column(name = "zip_code")
    private Integer zipCode;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "contact_phone_no")
    private String contactPhoneNo;

    @Column(name = "alt_phone_no")
    private String altPhoneNo;

    @Column(name = "contact_person_email_id")
    private String contactPersonEmailId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "manufacturer_code")
    private String manufacturerCode;

    @Column(name = "supplier_id")
    private Long supplierId;

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