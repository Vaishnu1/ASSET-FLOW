package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BusinessPartnerContactDTO {
    private Long businessPartnerContId;
    private Long businessPartnerSiteId;
    private Long businessPartnerId;
    private String contactPersonName;
    private String contactPersonPhoneNo;
    private String contactPersonEmailId;
    private String contactPersonDesignation;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}