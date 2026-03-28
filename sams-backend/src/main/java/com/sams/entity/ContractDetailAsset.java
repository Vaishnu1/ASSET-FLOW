package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_contract_detail_asset", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractDetailAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "contract_asset_id")
    private long contractAssetId;

    @Column(name = "contract_hdr_id")
    private long contractHdrId;

    @Column(name = "asset_hdr_id")
    private long assetHdrId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "model_id")
    private long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "description")
    private String description;

    @Column(name = "equipment_code")
    private String equipmentCode;

    @Column(name = "contract_already_exist_for_period")
    private Boolean contractAlreadyExistForPeriod;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "serial_no")
    private Integer serialNo;

    @Column(name = "total_purchase_amt")
    private Integer totalPurchaseAmt;

    @Column(name = "sub_category_name")
    private String subCategoryName;

    @Column(name = "excluded_services")
    private String excludedServices;

    @Column(name = "included_services")
    private String includedServices;

    @Column(name = "contract_amnt")
    private Integer contractAmnt;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}