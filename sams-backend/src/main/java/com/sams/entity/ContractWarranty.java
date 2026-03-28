package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contract_warranty", schema = "dashboard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractWarranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_warranty_id")
    private Long contractWarrantyId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "active_contracts")
    private Long activeContracts;

    @Column(name = "expired_contracts")
    private Long expiredContracts;

    @Column(name = "total_contract_value")
    private Double totalContractValue;

    @Column(name = "active_warranties")
    private Long activeWarranties;

    @Column(name = "expired_warranties")
    private Long expiredWarranties;

    @Column(name = "covered_warranties")
    private Long coveredWarranties;

    @Column(name = "uncovered_warranties")
    private Long uncoveredWarranties;

    @Column(name = "summary_month")
    private LocalDateTime summaryMonth;

    @Column(name = "warranty_coverage_json")
    private String warrantyCoverageJson;

    @Column(name = "type_distribution_json")
    private String typeDistributionJson;

    @Column(name = "expiry_timeline_json")
    private String expiryTimelineJson;

    @Column(name = "top_vendors_json")
    private String topVendorsJson;

    @Column(name = "value_by_type_json")
    private String valueByTypeJson;

    @Column(name = "active_contracts_asset_count")
    private Long activeContractsAssetCount;

    @Column(name = "insurance")
    private Long insurance;

    @Column(name = "extended_warranty")
    private Long extendedWarranty;

    @Column(name = "expired_timeline_json")
    private String expiredTimelineJson;

}