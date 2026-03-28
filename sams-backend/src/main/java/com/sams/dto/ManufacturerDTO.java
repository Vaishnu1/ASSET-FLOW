package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ManufacturerDTO {
    private Long id;
    private Long manufacturerId;
    private Long orgId;
    private String manufacturerName;
    private String address;
    private String area;
    private String locCountry;
    private Long locCountryId;
    private Long locStateId;
    private String locState;
    private Long locCityId;
    private String locCity;
    private Integer zipCode;
    private String emailId;
    private String phoneNo;
    private String contactPerson;
    private String contactPhoneNo;
    private String altPhoneNo;
    private String contactPersonEmailId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private String manufacturerCode;
    private Long supplierId;
    private String supplierName;
}