package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PoTermsAndConditionsDTO {
    private Long poTermsAndConditionsId;
    private Long poHdrId;
    private String paymentTerms;
    private Double advancePaymentPercentage;
    private String advancePaymentCoverage;
    private String creditPaymnetType;
    private LocalDateTime expectedArrivalDate;
    private Long longTermCreditDays;
    private String warrantyTerms;
    private Boolean freightChargesIndluded;
    private String frieghtChargesCoverage;
    private Boolean insuranceCovered;
    private String insuranceCoverageTerms;
    private Boolean taxIncluded;
    private String taxCoverageTerms;
    private Boolean specialTermsAvailable;
    private String specialTerms;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String quoteReferenceNo;
    private String paymentTermsAndConditionsString;
    private String freightChargesString;
    private String insuranceCoveredString;
    private String taxIncludedString;
    private String specialTermsString;
    private Long shortTermCreditDays;
}