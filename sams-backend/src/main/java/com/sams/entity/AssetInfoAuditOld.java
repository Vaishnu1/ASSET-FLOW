package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_info_audit_old", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetInfoAuditOld {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "mode")
    private String mode;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_type_name")
    private String assetTypeName;

    @Column(name = "description")
    private String description;

    @Column(name = "serial_no")
    private String serialNo;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "status_type_id")
    private Long statusTypeId;

    @Column(name = "asset_condition_id")
    private Long assetConditionId;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "building_block")
    private String buildingBlock;

    @Column(name = "building_floor")
    private String buildingFloor;

    @Column(name = "building_room_name")
    private String buildingRoomName;

    @Column(name = "building_segment")
    private String buildingSegment;

    @Column(name = "ownership_type")
    private String ownershipType;

    @Column(name = "functional_status")
    private String functionalStatus;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "purchase_order_no")
    private String purchaseOrderNo;

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

    @Column(name = "installation_dt")
    private LocalDateTime installationDt;

    @Column(name = "depreciation_method")
    private String depreciationMethod;

    @Column(name = "book_value")
    private Double bookValue;

    @Column(name = "no_of_years")
    private Double noOfYears;

    @Column(name = "scrap_value")
    private Long scrapValue;

    @Column(name = "disposed_dt")
    private LocalDateTime disposedDt;

    @Column(name = "disposed_by")
    private String disposedBy;

    @Column(name = "retired_dt")
    private LocalDateTime retiredDt;

    @Column(name = "retired_by")
    private String retiredBy;

    @Column(name = "age_criteria")
    private Long ageCriteria;

    @Column(name = "age_of_the_asset")
    private Long ageOfTheAsset;

    @Column(name = "transaction_src")
    private String transactionSrc;

    @Column(name = "remarks")
    private String remarks;

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

    @Column(name = "equipment_code")
    private String equipmentCode;

    @Column(name = "maintenance_strategy")
    private String maintenanceStrategy;

    @Column(name = "pm_maintenance_strategy")
    private String pmMaintenanceStrategy;

    @Column(name = "pa_maintenance_strategy")
    private String paMaintenanceStrategy;

    @Column(name = "qa_maintenance_strategy")
    private String qaMaintenanceStrategy;

    @Column(name = "purchase_order_dt")
    private LocalDateTime purchaseOrderDt;

    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

}