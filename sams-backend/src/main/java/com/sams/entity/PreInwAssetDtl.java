package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pre_inw_asset_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreInwAssetDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inward_inventory_dtl_id")
    private Long inwardInventoryDtlId;

    @Column(name = "inward_inventory_hdr_id")
    private Long inwardInventoryHdrId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_name")
    private String businessPartnerName;

    @Column(name = "ownership_type")
    private String ownershipType;

    @Column(name = "pre_inw_status_id")
    private Long preInwStatusId;

    @Column(name = "location_currency_code")
    private String locationCurrencyCode;

    @Column(name = "purchase_currency_code")
    private String purchaseCurrencyCode;

    @Column(name = "purchase_qty")
    private Long purchaseQty;

    @Column(name = "original_purchase_amount")
    private Double originalPurchaseAmount;

    @Column(name = "exchange_rate")
    private Double exchangeRate;

    @Column(name = "local_purchase_amount")
    private Double localPurchaseAmount;

    @Column(name = "local_tax_rate")
    private Double localTaxRate;

    @Column(name = "local_tax_amount")
    private Double localTaxAmount;

    @Column(name = "total_purchase_amount")
    private Double totalPurchaseAmount;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "asset_type_name")
    private String assetTypeName;

    @Column(name = "purchase_status")
    private String purchaseStatus;

    @Column(name = "create_contract_amc_cmc")
    private Boolean createContractAmcCmc;

}