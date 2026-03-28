package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_customer", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "customer_site_list")
    private String customerSiteList;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "customer_area")
    private String customerArea;

    @Column(name = "customer_city")
    private String customerCity;

    @Column(name = "customer_state")
    private String customerState;

    @Column(name = "customer_country")
    private String customerCountry;

    @Column(name = "customer_country_id")
    private String customerCountryId;

    @Column(name = "active_disp")
    private Boolean activeDisp;

    @Column(name = "active_display")
    private String activeDisplay;

    @Column(name = "customer_site_name")
    private String customerSiteName;

    @Column(name = "customer_since_dt_disp")
    private String customerSinceDtDisp;

    @Column(name = "customer_since_dt")
    private String customerSinceDt;

    @Column(name = "active_y_or_n")
    private String activeYOrN;

    @Column(name = "contact_person_no")
    private String contactPersonNo;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}