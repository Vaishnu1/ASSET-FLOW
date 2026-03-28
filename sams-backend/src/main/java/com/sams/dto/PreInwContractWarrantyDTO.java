package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PreInwContractWarrantyDTO {
    private Long preInwContractWarrantyId;
    private Long inwardInventoryDtlId;
    private Long seqNo;
    private Long coverageTypeId;
    private Long contractTypeId;
    private String coverageStartingFrom;
    private Long periodInYears;
    private Long periodInMonths;
    private String includedServices;
    private String excludedServices;
    private Double amcCmcValue;
    private Double amcCmcPercentage;
    private Double nextAmcCmcEscalationPer;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}