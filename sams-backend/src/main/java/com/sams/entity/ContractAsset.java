package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contract_asset", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_asset_id")
    private Long contractAssetId;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "included_services")
    private String includedServices;

    @Column(name = "excluded_services")
    private String excludedServices;

    @Column(name = "contract_amnt")
    private Double contractAmnt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}