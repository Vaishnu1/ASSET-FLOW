package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pre_inw_contract_warranty", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreInwContractWarranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pre_inw_contract_warranty_id")
    private Long preInwContractWarrantyId;

    @Column(name = "inward_inventory_dtl_id")
    private Long inwardInventoryDtlId;

    @Column(name = "seq_no")
    private Long seqNo;

    @Column(name = "coverage_type_id")
    private Long coverageTypeId;

    @Column(name = "contract_type_id")
    private Long contractTypeId;

    @Column(name = "coverage_starting_from")
    private String coverageStartingFrom;

    @Column(name = "period_in_years")
    private Long periodInYears;

    @Column(name = "period_in_months")
    private Long periodInMonths;

    @Column(name = "included_services")
    private String includedServices;

    @Column(name = "excluded_services")
    private String excludedServices;

    @Column(name = "amc_cmc_value")
    private Double amcCmcValue;

    @Column(name = "amc_cmc_percentage")
    private Double amcCmcPercentage;

    @Column(name = "next_amc_cmc_escalation_per")
    private Double nextAmcCmcEscalationPer;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}