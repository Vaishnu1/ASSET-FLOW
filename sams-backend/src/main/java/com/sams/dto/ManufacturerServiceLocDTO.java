package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ManufacturerServiceLocDTO {
    private Long manufacturerServiceLocId;
    private Long orgId;
    private Long manufacturerId;
    private String serviceLocationName;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String contactPersonName;
    private String contactPersonLandlineNo;
    private String contactPersonPhoneNo;
    private String contactPersonEmailId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}