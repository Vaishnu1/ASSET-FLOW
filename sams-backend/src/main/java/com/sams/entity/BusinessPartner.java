package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_business_partner", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessPartner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

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

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_name")
    private String businessPartnerName;

    @Column(name = "partner_site_id")
    private Long partnerSiteId;

    @Column(name = "partner_site_name")
    private String partnerSiteName;

    @Column(name = "partner_site_country")
    private String partnerSiteCountry;

    @Column(name = "partner_site_country_id")
    private Long partnerSiteCountryId;

    @Column(name = "partner_site_state_id")
    private Long partnerSiteStateId;

    @Column(name = "partner_site_state")
    private String partnerSiteState;

    @Column(name = "partner_site_city")
    private String partnerSiteCity;

    @Column(name = "partner_site_area")
    private String partnerSiteArea;

    @Column(name = "active_from_dt_disp")
    private String activeFromDtDisp;

    @Column(name = "active_till_dt_disp")
    private String activeTillDtDisp;

    @Column(name = "selected_roles_list")
    private Integer selectedRolesList;

    @Column(name = "business_partner_role_id")
    private Long businessPartnerRoleId;

    @Column(name = "business_partner_role_name")
    private String businessPartnerRoleName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}