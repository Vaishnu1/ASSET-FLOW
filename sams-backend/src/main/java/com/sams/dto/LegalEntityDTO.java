package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LegalEntityDTO {
    private Long legalEntityId;
    private Long orgId;
    private String orgName;
    private String legalEntityName;
    private String legalEntityCode;
    private String legalEntityDesc;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private String postalCd;
    private String emailId;
    private String phoneNumber;
    private String curCd;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}