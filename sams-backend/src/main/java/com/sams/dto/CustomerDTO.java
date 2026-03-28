package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomerDTO {
    private Long id;
    private Long customerId;
    private String customerName;
    private String customerCode;
    private String customerSiteList;
    private String updatedDtDisp;
    private String createdDtDisp;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean active;
    private Long orgId;
    private String customerArea;
    private String customerCity;
    private String customerState;
    private String customerCountry;
    private String customerCountryId;
    private Boolean activeDisp;
    private String activeDisplay;
    private String customerSiteName;
    private String customerSinceDtDisp;
    private String customerSinceDt;
    private String activeYOrN;
    private String contactPersonNo;
}