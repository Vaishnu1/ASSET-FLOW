package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_info", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "equipment_code")
    private String equipmentCode;

    @Column(name = "description")
    private String description;

    @Column(name = "serial_no")
    private String serialNo;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_type_name")
    private String assetTypeName;

    @Column(name = "asset_priority")
    private String assetPriority;

    @Column(name = "asset_risk_nature")
    private String assetRiskNature;

    @Column(name = "functional_status")
    private String functionalStatus;

    @Column(name = "maintenance_threshold_value")
    private Double maintenanceThresholdValue;

    @Column(name = "expected_life_in_years")
    private Double expectedLifeInYears;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "ownership_type")
    private String ownershipType;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_site_id")
    private Long customerSiteId;

    @Column(name = "purchase_order_no")
    private String purchaseOrderNo;

    @Column(name = "purchase_order_dt")
    private LocalDateTime purchaseOrderDt;

    @Column(name = "location_currency_code")
    private String locationCurrencyCode;

    @Column(name = "purchase_currency_code")
    private String purchaseCurrencyCode;

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

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "invoice_dt")
    private LocalDateTime invoiceDt;

    @Column(name = "invoice_value")
    private Double invoiceValue;

    @Column(name = "installation_type")
    private String installationType;

    @Column(name = "installation_dt")
    private LocalDateTime installationDt;

    @Column(name = "expected_installation_dt")
    private LocalDateTime expectedInstallationDt;

    @Column(name = "actual_installed_dt")
    private LocalDateTime actualInstalledDt;

    @Column(name = "age_of_the_asset")
    private Double ageOfTheAsset;

    @Column(name = "installed_by")
    private String installedBy;

    @Column(name = "installation_remarks")
    private String installationRemarks;

    @Column(name = "handover_dt")
    private LocalDateTime handoverDt;

    @Column(name = "building_block")
    private String buildingBlock;

    @Column(name = "building_floor")
    private String buildingFloor;

    @Column(name = "building_segment")
    private String buildingSegment;

    @Column(name = "building_room_name")
    private String buildingRoomName;

    @Column(name = "depreciation_method")
    private String depreciationMethod;

    @Column(name = "book_value")
    private Double bookValue;

    @Column(name = "no_of_years")
    private Double noOfYears;

    @Column(name = "scrap_value")
    private Long scrapValue;

    @Column(name = "retired_by")
    private String retiredBy;

    @Column(name = "retired_dt")
    private LocalDateTime retiredDt;

    @Column(name = "disposed_by")
    private String disposedBy;

    @Column(name = "disposed_dt")
    private LocalDateTime disposedDt;

    @Column(name = "inward_inventory_hdr_id")
    private Long inwardInventoryHdrId;

    @Column(name = "inward_inventory_dtl_id")
    private Long inwardInventoryDtlId;

    @Column(name = "expected_arrival_dt")
    private LocalDateTime expectedArrivalDt;

    @Column(name = "received_by")
    private String receivedBy;

    @Column(name = "received_dt")
    private LocalDateTime receivedDt;

    @Column(name = "delivery_remarks")
    private String deliveryRemarks;

    @Column(name = "installation_wo_number")
    private String installationWoNumber;

    @Column(name = "installation_done_by")
    private String installationDoneBy;

    @Column(name = "ins_internal_engineer_id")
    private Long insInternalEngineerId;

    @Column(name = "ins_internal_engineer_name")
    private String insInternalEngineerName;

    @Column(name = "installation_provided_by")
    private String installationProvidedBy;

    @Column(name = "installation_provided_by_id")
    private Long installationProvidedById;

    @Column(name = "installation_provided_by_name")
    private String installationProvidedByName;

    @Column(name = "ins_external_engineer_name")
    private String insExternalEngineerName;

    @Column(name = "ins_ext_engineer_contact_no")
    private String insExtEngineerContactNo;

    @Column(name = "ins_ext_engineer_email_id")
    private String insExtEngineerEmailId;

    @Column(name = "total_amc_cmc_cost_incurred")
    private Double totalAmcCmcCostIncurred;

    @Column(name = "total_accessories_cost")
    private Double totalAccessoriesCost;

    @Column(name = "total_consumable_cost")
    private Double totalConsumableCost;

    @Column(name = "spare_cost_used_from_stock")
    private Double spareCostUsedFromStock;

    @Column(name = "spare_cost_misc_purchased")
    private Double spareCostMiscPurchased;

    @Column(name = "labour_charge_cost")
    private Double labourChargeCost;

    @Column(name = "total_engineer_cost")
    private Double totalEngineerCost;

    @Column(name = "unit_in_good_working")
    private Boolean unitInGoodWorking;

    @Column(name = "unit_in_partially_working")
    private Boolean unitInPartiallyWorking;

    @Column(name = "handover_completed_status")
    private Boolean handoverCompletedStatus;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "last_updated_cost_info_dtl_dt")
    private LocalDateTime lastUpdatedCostInfoDtlDt;

    @Column(name = "age_criteria")
    private Long ageCriteria;

    @Column(name = "inclusive_tax")
    private Boolean inclusiveTax;

    @Column(name = "volume_license_qty")
    private Long volumeLicenseQty;

    @Column(name = "used_volume_license_qty")
    private Long usedVolumeLicenseQty;

    @Column(name = "rate_of_depreciation")
    private Double rateOfDepreciation;

    @Column(name = "status_type_id")
    private Long statusTypeId;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "process_status_id")
    private Long processStatusId;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "scrap_value_percentage")
    private Double scrapValuePercentage;

    @Column(name = "transaction_src")
    private String transactionSrc;

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

    @Column(name = "capex_number")
    private String capexNumber;

    @Column(name = "far_number")
    private String farNumber;

    @Column(name = "purchased_status")
    private String purchasedStatus;

    @Column(name = "service_provider_id")
    private Long serviceProviderId;

    @Column(name = "service_provider_site_id")
    private Long serviceProviderSiteId;

    @Column(name = "pm_maintenance_strategy")
    private String pmMaintenanceStrategy;

    @Column(name = "pa_maintenance_strategy")
    private String paMaintenanceStrategy;

    @Column(name = "qa_maintenance_strategy")
    private String qaMaintenanceStrategy;

    @Column(name = "maintenance_strategy")
    private String maintenanceStrategy;

    @Column(name = "amc_percent")
    private Double amcPercent;

    @Column(name = "cmc_percent")
    private Double cmcPercent;

    @Column(name = "amc_value")
    private Double amcValue;

    @Column(name = "cmc_value")
    private Double cmcValue;

    @Column(name = "amc_escalation_percentage")
    private Double amcEscalationPercentage;

    @Column(name = "cmc_escalation_percentage")
    private Double cmcEscalationPercentage;

    @Column(name = "amc_escalation_value")
    private Double amcEscalationValue;

    @Column(name = "cmc_escalation_value")
    private Double cmcEscalationValue;

    @Column(name = "change_asset_code_req_flag")
    private Boolean changeAssetCodeReqFlag;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "owned_by")
    private String ownedBy;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "income_tax_depreciation")
    private Double incomeTaxDepreciation;

    @Column(name = "pm_frequency")
    private String pmFrequency;

    @Column(name = "pa_frequency")
    private String paFrequency;

    @Column(name = "qa_frequency")
    private String qaFrequency;

    @Column(name = "pm_month")
    private String pmMonth;

    @Column(name = "pa_month")
    private String paMonth;

    @Column(name = "qa_month")
    private String qaMonth;

    @Column(name = "pm_date")
    private LocalDateTime pmDate;

    @Column(name = "pa_date")
    private LocalDateTime paDate;

    @Column(name = "qa_date")
    private LocalDateTime qaDate;

    @Column(name = "am_frequency")
    private String amFrequency;

    @Column(name = "am_month")
    private String amMonth;

    @Column(name = "am_date")
    private LocalDateTime amDate;

    @Column(name = "last_auto_pm_created_date")
    private LocalDateTime lastAutoPmCreatedDate;

    @Column(name = "last_auto_pa_created_date")
    private LocalDateTime lastAutoPaCreatedDate;

    @Column(name = "last_auto_qa_created_date")
    private LocalDateTime lastAutoQaCreatedDate;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "maintenance_threshold_percentage")
    private Double maintenanceThresholdPercentage;

    @Column(name = "work_flow_process_status_id")
    private Long workFlowProcessStatusId;

}