package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierLocationDTO {
    private Long id;
    private Long supplierLocationId;
    private Long supplierId;
    private String supplierSiteName;
    private String contactPerson;
    private String suppLocAddress1;
    private String suppLocAddress2;
    private String suppLocArea;
    private String suppLocCity;
    private String suppLocState;
    private String suppLocCountry;
    private String suppLocPinCode;
    private String companyRegistrationNumber;
    private String taxRegistrationName1;
    private String taxRegistrationName2;
    private String taxRegistrationName3;
    private String mobileNumber;
    private String landLineNumber;
    private String suppLocEmail;
    private String suppLocCurCd;
    private String paymentTerms;
    private String paymentMethod;
    private String suppLocAttribute1;
    private String suppLocAttribute2;
    private String suppLocAttribute3;
    private String suppLocAttribute4;
    private String suppLocAttribute5;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String supplierRegList;
    private String supplierType;
    private String supplierName;
}