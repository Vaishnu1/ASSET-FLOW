package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_type")
    private String supplierType;

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

    @Column(name = "supplier_loc_list")
    private String supplierLocList;

    @Column(name = "supplier_code")
    private String supplierCode;

    @Column(name = "active_status_disp")
    private String activeStatusDisp;

    @Column(name = "sup_site_state")
    private String supSiteState;

    @Column(name = "supplier_location_name")
    private String supplierLocationName;

    @Column(name = "sup_site_city")
    private String supSiteCity;

    @Column(name = "sup_site_area")
    private String supSiteArea;

    @Column(name = "active_display")
    private String activeDisplay;

    @Column(name = "contact_person_no")
    private String contactPersonNo;

    @Column(name = "active_disp")
    private Boolean activeDisp;

    @Column(name = "models_supplied_list")
    private String modelsSuppliedList;

    @Column(name = "sup_country")
    private String supCountry;

    @Column(name = "sup_country_id")
    private Long supCountryId;

    @Column(name = "sup_site_state_id")
    private Long supSiteStateId;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}