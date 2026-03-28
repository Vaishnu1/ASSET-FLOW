package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomerSiteDTO {
    private Long id;
    private Long customerId;
    private Long customerSiteId;
    private String customerSiteName;
    private String customerName;
    private String custContactPerson;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private String postalCd;
    private String contactNo1;
    private String contactNo2;
    private String contactNo3;
    private String custEmailId;
    private String custCurCd;
    private String custShipTermsCd;
    private String custShipModeCd;
    private String custTransporterName;
    private String custPayTermsCd;
    private String custPayTermDays;
    private String custGlAccCd;
    private String custBankName;
    private String custBankBranchName;
    private String custBankAccNo;
    private String custBankAddress1;
    private String custBankAddress2;
    private String custBankCity;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
}