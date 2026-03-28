package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_manufacturer_service_loc", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManufacturerServiceLoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manufacturer_service_loc_id")
    private Long manufacturerServiceLocId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "service_location_name")
    private String serviceLocationName;

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

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "contact_person_name")
    private String contactPersonName;

    @Column(name = "contact_person_landline_no")
    private String contactPersonLandlineNo;

    @Column(name = "contact_person_phone_no")
    private String contactPersonPhoneNo;

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

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}