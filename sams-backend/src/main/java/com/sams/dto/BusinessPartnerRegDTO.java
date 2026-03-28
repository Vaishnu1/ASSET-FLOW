package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BusinessPartnerRegDTO {
    private Long businessPartnerRegId;
    private Long businessPartnerSiteId;
    private Long businessPartnerId;
    private String registrationName;
    private String registrationNo;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}