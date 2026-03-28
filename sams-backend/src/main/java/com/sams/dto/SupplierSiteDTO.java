package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierSiteDTO {
    private Long supplierSiteId;
    private Long supplierId;
    private String supplierSiteName;
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
    private Boolean serviceCenter;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}