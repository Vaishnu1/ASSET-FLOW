package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GatePassHdrDTO {
    private Long gatePassHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String gatePassNo;
    private Long gatePassStatusId;
    private String gatePassSource;
    private Long gatePassSourceId;
    private String gatePassSourceNo;
    private String gatePassPurpose;
    private String deliveryTo;
    private Long deliveryToId;
    private String deliveryToName;
    private Long siteServiceLocationId;
    private String siteServiceLocationName;
    private String deliveryToAddress1;
    private String deliveryToAddress2;
    private String deliveryToCity;
    private String deliveryToState;
    private String deliveryToCountry;
    private String deliveryToZipcode;
    private String deliveryTakenByPerson;
    private String deliveryTakenByContactNo;
    private String deliveryTakenByEmailId;
    private String deliveryMode;
    private String cancelledBy;
    private LocalDateTime cancelledDt;
    private LocalDateTime gatePassDt;
    private String remarks;
    private String generatedBy;
    private Boolean active;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}