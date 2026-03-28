package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "gate_pass_hdr", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GatePassHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gate_pass_hdr_id")
    private Long gatePassHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "gate_pass_no")
    private String gatePassNo;

    @Column(name = "gate_pass_status_id")
    private Long gatePassStatusId;

    @Column(name = "gate_pass_source")
    private String gatePassSource;

    @Column(name = "gate_pass_source_id")
    private Long gatePassSourceId;

    @Column(name = "gate_pass_source_no")
    private String gatePassSourceNo;

    @Column(name = "gate_pass_purpose")
    private String gatePassPurpose;

    @Column(name = "delivery_to")
    private String deliveryTo;

    @Column(name = "delivery_to_id")
    private Long deliveryToId;

    @Column(name = "delivery_to_name")
    private String deliveryToName;

    @Column(name = "site_service_location_id")
    private Long siteServiceLocationId;

    @Column(name = "site_service_location_name")
    private String siteServiceLocationName;

    @Column(name = "delivery_to_address1")
    private String deliveryToAddress1;

    @Column(name = "delivery_to_address2")
    private String deliveryToAddress2;

    @Column(name = "delivery_to_city")
    private String deliveryToCity;

    @Column(name = "delivery_to_state")
    private String deliveryToState;

    @Column(name = "delivery_to_country")
    private String deliveryToCountry;

    @Column(name = "delivery_to_zipcode")
    private String deliveryToZipcode;

    @Column(name = "delivery_taken_by_person")
    private String deliveryTakenByPerson;

    @Column(name = "delivery_taken_by_contact_no")
    private String deliveryTakenByContactNo;

    @Column(name = "delivery_taken_by_email_id")
    private String deliveryTakenByEmailId;

    @Column(name = "delivery_mode")
    private String deliveryMode;

    @Column(name = "cancelled_by")
    private String cancelledBy;

    @Column(name = "cancelled_dt")
    private LocalDateTime cancelledDt;

    @Column(name = "gate_pass_dt")
    private LocalDateTime gatePassDt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "generated_by")
    private String generatedBy;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}