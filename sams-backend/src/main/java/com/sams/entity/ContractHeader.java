package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_contract_header", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "direction")
    private String direction;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "contract_hdr_id")
    private Long contractHdrId;

    @Column(name = "contract_no")
    private String contractNo;

    @Column(name = "contract_name")
    private String contractName;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "coverage_type")
    private String coverageType;

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

    @Column(name = "active")
    private Boolean active;

    @Column(name = "terms_conditions")
    private String termsConditions;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "contract_start_dt")
    private LocalDateTime contractStartDt;

    @Column(name = "contract_start_dt_disp")
    private String contractStartDtDisp;

    @Column(name = "contract_end_dt")
    private LocalDateTime contractEndDt;

    @Column(name = "contract_end_dt_disp")
    private String contractEndDtDisp;

    @Column(name = "expiry_prior_notify_days")
    private Integer expiryPriorNotifyDays;

    @Column(name = "contract_basic_value")
    private Integer contractBasicValue;

    @Column(name = "discount_rate")
    private Integer discountRate;

    @Column(name = "discount_amt")
    private Integer discountAmt;

    @Column(name = "contract_gross_value")
    private Integer contractGrossValue;

    @Column(name = "tax_code1")
    private String taxCode1;

    @Column(name = "tax_code2")
    private String taxCode2;

    @Column(name = "tax_code3")
    private String taxCode3;

    @Column(name = "tax_rate1")
    private Integer taxRate1;

    @Column(name = "tax_rate2")
    private Integer taxRate2;

    @Column(name = "tax_value1")
    private Integer taxValue1;

    @Column(name = "tax_value2")
    private Integer taxValue2;

    @Column(name = "net_contract_value")
    private Integer netContractValue;

    @Column(name = "included_service")
    private String includedService;

    @Column(name = "excluded_service")
    private String excludedService;

    @Column(name = "auto_renewal")
    private String autoRenewal;

    @Column(name = "expired_contracts")
    private Boolean expiredContracts;

    @Column(name = "interval_based_contract")
    private String intervalBasedContract;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "log_in_user_org_id")
    private Long logInUserOrgId;

    @Column(name = "log_in_user_loc_id")
    private Long logInUserLocId;

    @Column(name = "log_in_user_id")
    private Long logInUserId;

    @Column(name = "asset_list")
    private String assetList;

    @Column(name = "search_value")
    private String searchValue;

    @Column(name = "search_value1")
    private String searchValue1;

    @Column(name = "contract_status")
    private String contractStatus;

    @Column(name = "contract_status_id")
    private Long contractStatusId;

    @Column(name = "days_elapsed")
    private Integer daysElapsed;

    @Column(name = "approval_id")
    private Long approvalId;

    @Column(name = "contract_without_price")
    private Boolean contractWithoutPrice;

    @Column(name = "contract_without_supplier")
    private Boolean contractWithoutSupplier;

    @Column(name = "process_status")
    private String processStatus;

    @Column(name = "workflow_process_status_id")
    private Long workflowProcessStatusId;

    @Column(name = "selected_location_ids")
    private Long selectedLocationIds;

    @Column(name = "selected_location_names")
    private String selectedLocationNames;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}