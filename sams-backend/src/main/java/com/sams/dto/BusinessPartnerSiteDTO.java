package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BusinessPartnerSiteDTO {
    private Long businessPartnerSiteId;
    private Long businessPartnerId;
    private String partnerSiteName;
    private String contactPersonName;
    private String contactPersonPhoneNo;
    private String contactPersonEmailId;
    private String address1;
    private String address2;
    private String area;
    private String city;
    private String state;
    private String country;
    private String pinCode;
    private String companyMobileNumber;
    private String companyLandLineNumber;
    private String companyEmailId;
    private String curCd;
    private String paymentTerms;
    private String paymentMethod;
    private String website;
    private Boolean serviceCenterSite;
    private Boolean supplierSite;
    private Boolean manufacturerSite;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}