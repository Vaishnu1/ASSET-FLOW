package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PreInwAssetDtlDTO {
    private Long inwardInventoryDtlId;
    private Long inwardInventoryHdrId;
    private Long modelId;
    private String modelName;
    private Long businessPartnerId;
    private String businessPartnerName;
    private String ownershipType;
    private Long preInwStatusId;
    private String locationCurrencyCode;
    private String purchaseCurrencyCode;
    private Long purchaseQty;
    private Double originalPurchaseAmount;
    private Double exchangeRate;
    private Double localPurchaseAmount;
    private Double localTaxRate;
    private Double localTaxAmount;
    private Double totalPurchaseAmount;
    private Double unitPrice;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long assetCategoryId;
    private Long assetSubCategoryId;
    private Long assetTypeId;
    private String assetCategoryName;
    private String assetSubCategoryName;
    private String assetTypeName;
    private String purchaseStatus;
    private Boolean createContractAmcCmc;
}