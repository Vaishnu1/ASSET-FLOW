package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ContractWarrantyDTO {
    private Long contractWarrantyId;
    private Long orgId;
    private Long locationId;
    private Long assetCategoryId;
    private String assetCategoryName;
    private Long assetSubCategoryId;
    private String assetSubCategoryName;
    private Long departmentId;
    private String departmentName;
    private Long activeContracts;
    private Long expiredContracts;
    private Double totalContractValue;
    private Long activeWarranties;
    private Long expiredWarranties;
    private Long coveredWarranties;
    private Long uncoveredWarranties;
    private LocalDateTime summaryMonth;
    private String warrantyCoverageJson;
    private String typeDistributionJson;
    private String expiryTimelineJson;
    private String topVendorsJson;
    private String valueByTypeJson;
    private Long activeContractsAssetCount;
    private Long insurance;
    private Long extendedWarranty;
    private String expiredTimelineJson;
}