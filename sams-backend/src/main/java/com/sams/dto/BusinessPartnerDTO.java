package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BusinessPartnerDTO {
    private Long id;
    private Long orgId;
    private String orgName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private Long businessPartnerId;
    private String businessPartnerName;
    private Long partnerSiteId;
    private String partnerSiteName;
    private String partnerSiteCountry;
    private Long partnerSiteCountryId;
    private Long partnerSiteStateId;
    private String partnerSiteState;
    private String partnerSiteCity;
    private String partnerSiteArea;
    private String activeFromDtDisp;
    private String activeTillDtDisp;
    private Integer selectedRolesList;
    private Long businessPartnerRoleId;
    private String businessPartnerRoleName;
}