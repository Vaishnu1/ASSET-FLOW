package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contract", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "contract_no")
    private String contractNo;

    @Column(name = "contract_name")
    private String contractName;

    @Column(name = "coverage_type")
    private String coverageType;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "contract_status_id")
    private Long contractStatusId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "contracting_party_type")
    private String contractingPartyType;

    @Column(name = "contract_party_id")
    private Long contractPartyId;

    @Column(name = "contract_party_name")
    private String contractPartyName;

    @Column(name = "contract_party_location_id")
    private Long contractPartyLocationId;

    @Column(name = "contract_party_location_name")
    private String contractPartyLocationName;

    @Column(name = "contact_person_id")
    private Long contactPersonId;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "expiry_prior_notify_days")
    private Long expiryPriorNotifyDays;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_date")
    private LocalDateTime poDate;

    @Column(name = "contract_inactive_on")
    private LocalDateTime contractInactiveOn;

    @Column(name = "contract_basic_value")
    private Double contractBasicValue;

    @Column(name = "discount_rate")
    private Double discountRate;

    @Column(name = "discount_amount")
    private Double discountAmount;

    @Column(name = "gross_contract_value")
    private Double grossContractValue;

    @Column(name = "tax_cd_1")
    private String taxCd1;

    @Column(name = "tax_cd_2")
    private String taxCd2;

    @Column(name = "tax_cd_3")
    private String taxCd3;

    @Column(name = "tax_rate_1")
    private Double taxRate1;

    @Column(name = "tax_rate_2")
    private Double taxRate2;

    @Column(name = "tax_rate_3")
    private Double taxRate3;

    @Column(name = "tax_value_1")
    private Double taxValue1;

    @Column(name = "tax_value_2")
    private Double taxValue2;

    @Column(name = "tax_value_3")
    private Double taxValue3;

    @Column(name = "net_contract_value")
    private Double netContractValue;

    @Column(name = "included_service")
    private String includedService;

    @Column(name = "excluded_service")
    private String excludedService;

    @Column(name = "auto_renewal")
    private String autoRenewal;

    @Column(name = "appreciation_coeffecient")
    private Double appreciationCoeffecient;

    @Column(name = "auto_renew_created")
    private Boolean autoRenewCreated;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "tenure_payment_frequency")
    private String tenurePaymentFrequency;

    @Column(name = "tenure_payment_occurances")
    private Long tenurePaymentOccurances;

    @Column(name = "terms_condition")
    private String termsCondition;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "cancelled_by")
    private String cancelledBy;

    @Column(name = "cancelled_dt")
    private LocalDateTime cancelledDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "address_info")
    private String addressInfo;

    @Column(name = "exch_rate")
    private Double exchRate;

    @Column(name = "local_net_contract_value")
    private Double localNetContractValue;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "work_flow_process_status_id")
    private Long workFlowProcessStatusId;

    @Column(name = "terminate_reason")
    private String terminateReason;

    @Column(name = "insurance_type")
    private String insuranceType;

}