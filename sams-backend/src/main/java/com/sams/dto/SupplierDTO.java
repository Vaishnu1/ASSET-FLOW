package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierDTO {
    private Long id;
    private Long supplierId;
    private Long orgId;
    private String orgName;
    private String supplierName;
    private String supplierType;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String supplierLocList;
    private String supplierCode;
    private String activeStatusDisp;
    private String supSiteState;
    private String supplierLocationName;
    private String supSiteCity;
    private String supSiteArea;
    private String activeDisplay;
    private String contactPersonNo;
    private Boolean activeDisp;
    private String modelsSuppliedList;
    private String supCountry;
    private Long supCountryId;
    private Long supSiteStateId;
}