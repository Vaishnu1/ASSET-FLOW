package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "po_terms_and_conditions", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoTermsAndConditions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_terms_and_conditions_id")
    private Long poTermsAndConditionsId;

    @Column(name = "po_hdr_id")
    private Long poHdrId;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "advance_payment_percentage")
    private Double advancePaymentPercentage;

    @Column(name = "advance_payment_coverage")
    private String advancePaymentCoverage;

    @Column(name = "credit_paymnet_type")
    private String creditPaymnetType;

    @Column(name = "expected_arrival_date")
    private LocalDateTime expectedArrivalDate;

    @Column(name = "long_term_credit_days")
    private Long longTermCreditDays;

    @Column(name = "warranty_terms")
    private String warrantyTerms;

    @Column(name = "freight_charges_indluded")
    private Boolean freightChargesIndluded;

    @Column(name = "frieght_charges_coverage")
    private String frieghtChargesCoverage;

    @Column(name = "insurance_covered")
    private Boolean insuranceCovered;

    @Column(name = "insurance_coverage_terms")
    private String insuranceCoverageTerms;

    @Column(name = "tax_included")
    private Boolean taxIncluded;

    @Column(name = "tax_coverage_terms")
    private String taxCoverageTerms;

    @Column(name = "special_terms_available")
    private Boolean specialTermsAvailable;

    @Column(name = "special_terms")
    private String specialTerms;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "quote_reference_no")
    private String quoteReferenceNo;

    @Column(name = "payment_terms_and_conditions_string")
    private String paymentTermsAndConditionsString;

    @Column(name = "freight_charges_string")
    private String freightChargesString;

    @Column(name = "insurance_covered_string")
    private String insuranceCoveredString;

    @Column(name = "tax_included_string")
    private String taxIncludedString;

    @Column(name = "special_terms_string")
    private String specialTermsString;

    @Column(name = "short_term_credit_days")
    private Long shortTermCreditDays;

}